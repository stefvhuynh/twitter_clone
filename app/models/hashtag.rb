class Hashtag < ActiveRecord::Base
  has_many :mentions, as: :mentionable
  has_many :mentioned_tweets, through: :mentions, source: :tweet

  validates :name, presence: true, uniqueness: true
end
