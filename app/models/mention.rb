class Mention < ActiveRecord::Base
  belongs_to :tweet, inverse_of: :mentions
  belongs_to :user, inverse_of: :mentions

  validates :tweet, :user_id, presence: true
end
