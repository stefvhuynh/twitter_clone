class User < ActiveRecord::Base
  validates :name, :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates(
    :username, :email, :session_token,
    presence: true, uniqueness: true
  )

  def self.find_by_credentials(email, password)

  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

end
