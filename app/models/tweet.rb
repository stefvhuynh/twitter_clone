class Tweet < ActiveRecord::Base
  include Rails.application.routes.url_helpers

  belongs_to :user
  has_many :mentions, dependent: :destroy, inverse_of: :tweet
  has_many(
    :mentioned_users,
    through: :mentions,
    source: :mentionable,
    source_type: 'User'
  )

  has_many(
    :mentioned_hashtags,
    through: :mentions,
    source: :mentionable,
    source_type: 'Hashtag'
  )

  validates :body, presence: true, length: { maximum: 140 }
  validates :user_id, presence: true

  after_save :parse_for_users

  def parse_for_users
    # Use a look-behind to capture every non-whitespace word-character
    # after the @ symbol. Use uniq in case of double mentions.
    mentioned_usernames = self.body.scan(/(?<=@)[^\s\W]*/).uniq

    mentioned_usernames.each do |mentioned_username|
      user = User.find_by_username(mentioned_username)

      unless user.nil?
        self.mentions.create!(mentionable_id: user.id, mentionable_type: 'User')
      end
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
