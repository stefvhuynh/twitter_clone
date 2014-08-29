class Hashtag < ActiveRecord::Base
  include PgSearch
  multisearchable against: :name
  
  has_many :mentions, as: :mentionable
  has_many :mentioned_tweets, through: :mentions, source: :tweet

  validates :name, presence: true, uniqueness: true
end
