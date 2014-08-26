FactoryGirl.define do
  factory :tweet do
    body { Faker::Lorem.characters(140) }
    tweeter_id 1
  end
end
