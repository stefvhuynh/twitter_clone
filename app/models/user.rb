class User < ActiveRecord::Base
  has_many :tweets
  has_many :followed_follows, class_name: 'Follow', foreign_key: :followed_id
  has_many :follower_follows, class_name: 'Follow', foreign_key: :follower_id

  has_many :followeds, through: :follower_follows, source: :followed
  has_many :followers, through: :followed_follows, source: :follower
  has_many :followed_tweets, through: :followeds, source: :tweets

  has_attached_file :avatar
  validates_attachment_content_type(
    :avatar,
    content_type: /\Aimage\/.*\Z/
  )

  validates :name, :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates(
    :username, :email, :session_token,
    presence: true, uniqueness: true
  )

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    (user && user.is_password?(password)) ? user : nil
  end

  attr_reader :password
  after_initialize :ensure_session_token

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

end
