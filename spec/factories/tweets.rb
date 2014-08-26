FactoryGirl.define do
  factory :tweet do
    body { Faker::Lorem.characters(140) }
    user_id 1
  end
end
