# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :follow do
    followed_id 1
    follower_id 2
  end
end
