class User < ActiveRecord::Base
  include PgSearch
  multisearchable against: [:name, :username]

  has_many :tweets
  has_many :mentions, as: :mentionable, dependent: :destroy
  has_many :followed_follows, class_name: 'Follow', foreign_key: :follower_id
  has_many :follower_follows, class_name: 'Follow', foreign_key: :followed_id

  has_many :mentioned_tweets, through: :mentions, source: :tweet
  has_many :followeds, through: :followed_follows, source: :followed
  has_many :followers, through: :follower_follows, source: :follower
  has_many :followed_tweets, through: :followeds, source: :tweets

  has_attached_file(
    :avatar,
    default_url: "/images/missing:random.png"
  )

  Paperclip.interpolates :random do |attachment, style|
    attachment.instance.id % 5
  end

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
  validate :username_can_only_contain_valid_characters

  def self.find_or_create_by_oauth!(auth_hash)
    user = User.find_by(provider: auth_hash[:provider], uid: auth_hash[:uid])

    unless user.nil?
      return user
    else
      User.create!(
        provider: auth_hash[:provider],
        uid: auth_hash[:uid],
        name: auth_hash[:info][:name],
        email: auth_hash[:info][:email],
        username: auth_hash[:info][:name].gsub(/\s/, '_'), # Will maybe change
        password: SecureRandom::urlsafe_base64
      )
    end
  end

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

  def username_can_only_contain_valid_characters
    if self.username =~ /[^a-zA-Z0-9_]/
      errors[:username] << 'Username can only contain letters,
        numbers, and underscores.'
    end
  end
end
