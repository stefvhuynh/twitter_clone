class Mention < ActiveRecord::Base
  belongs_to :tweet, inverse_of: :mentions
  belongs_to :mentionable, polymorphic: true

  validates :tweet, :mentionable_id, presence: true
end
