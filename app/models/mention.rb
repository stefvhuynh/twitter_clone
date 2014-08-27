class Mention < ActiveRecord::Base
  belongs_to :tweet
  belongs_to :user

  validates :tweet_id, :user_id, presence: true
end
