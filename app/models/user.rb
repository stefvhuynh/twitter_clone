class User < ActiveRecord::Base
  has_many :tweets

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
  # before_validation :generate_default_username, on: :create

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
