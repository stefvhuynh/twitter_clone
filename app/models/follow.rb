class Follow < ActiveRecord::Base
  belongs_to :followed, class_name: 'User', foreign_key: :followed_id
  belongs_to :follower, class_name: 'User', foreign_key: :follower_id

  validates :followed_id, :follower_id, presence: true
  validates :followed_id, uniqueness: { scope: :follower_id }
end
