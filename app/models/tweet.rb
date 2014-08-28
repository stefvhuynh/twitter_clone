class Tweet < ActiveRecord::Base
  include Rails.application.routes.url_helpers

  belongs_to :user
  has_many :mentions, dependent: :destroy, inverse_of: :tweet
  has_many :mentioned_users, through: :mentions, source: :user

  validates :body, presence: true, length: { maximum: 140 }
  validates :user_id, presence: true

  after_save :parse_for_users

  def parse_for_users
    # Use a look-behind to capture every non-whitespace character
    # after the @ symbol. Use uniq in case of double mentions.
    mentioned_usernames = self.body.scan(/(?<=@)[^\s]*/).uniq

    mentioned_usernames.each do |mentioned_username|
      user = User.find_by_username(mentioned_username)
      self.mentions.create!(user_id: user.id) unless user.nil?
    end
  end

  def parse_for_hashtags
  end

  def display
    body_to_display = self.body
    self.mentioned_users.each do |mentioned_user|
      body_to_display.gsub!(
        '@' + mentioned_user.username,
        "<a href='/users/#{mentioned_user.id}'>@#{mentioned_user.username}</a>"
      )
    end

    body_to_display.html_safe
  end

end
