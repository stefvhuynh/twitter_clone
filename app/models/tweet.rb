class Tweet < ActiveRecord::Base
  validates :body, :tweeter_id, presence: true
end
