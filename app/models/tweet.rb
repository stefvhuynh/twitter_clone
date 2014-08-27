class Tweet < ActiveRecord::Base
  belongs_to :user
  has_many :mentions, dependent: :destroy, inverse_of: :tweet
  has_many :mentioned_users, through: :mentions, source: :user

  validates :body, presence: true, length: { maximum: 140 }
  validates :user_id, presence: true
end
