class Tweet < ActiveRecord::Base
  include PgSearch
  multisearchable against: :body
  
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

  before_validation :parse_for_users, :parse_for_hashtags

  def parse_for_users
    mentioned_usernames = self.body.scan(/(?<=@)[^\s\W]*/).uniq

    mentioned_usernames.each do |mentioned_username|
      user = User.find_by_username(mentioned_username)

      unless user.nil?
        self.mentions.new(
          mentionable_id: user.id,
          mentionable_type: 'User'
        )
      end
    end
  end

  def parse_for_hashtags
    mentioned_hashtags = self.body.scan(/(?<=#)[^\s\W]*/).uniq

    mentioned_hashtags.each do |mentioned_hashtag|
      hashtag = Hashtag.find_by_name(mentioned_hashtag) ||
        Hashtag.create!(name: mentioned_hashtag)

      self.mentions.new(
        mentionable_id: hashtag.id,
        mentionable_type: 'Hashtag'
      )
    end
  end

  def display
    display_text = self.body
    insert_user_links!(display_text)
    insert_hashtag_links!(display_text)
    display_text.html_safe
  end

  def insert_user_links!(display_text)
    self.mentioned_users.each do |mentioned_user|
      display_text.gsub!(
        '@' + mentioned_user.username,
        # When using backbone, include the # in front of users.
        "<a href='/#users/#{mentioned_user.id}'>@#{mentioned_user.username}</a>"
      )
    end
  end

  def insert_hashtag_links!(display_text)
    self.mentioned_hashtags.each do |mentioned_hashtag|
      display_text.gsub!(
        '#' + mentioned_hashtag.name,
        # When using backbone, include the # in front of hashtags.
        "<a href='/#hashtags/#{mentioned_hashtag.id}'>
          ##{mentioned_hashtag.name}</a>"
      )
    end
  end

end
