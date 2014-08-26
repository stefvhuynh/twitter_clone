FactoryGirl.define do
  factory :user do
    name { Faker::Name.name }
    username { Faker::Internet.user_name }
    email { Faker::Internet.email }
    password { Faker::Internet.password(8) }

    factory :user_with_tweets do
      ignore do
        tweets_count { (rand * 50).round }
      end

      after(:create) do |user_with_tweets, evaluator|
        create_list(
          :tweet,
          evaluator.tweets_count,
          user: user_with_tweets
        )
      end
    end
  end
end
