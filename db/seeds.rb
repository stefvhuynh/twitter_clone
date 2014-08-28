require 'faker'

User.create({
  name: 'Charlie Brown',
  email: 'charlie@brown.com',
  password: '123456',
  username: 'charlie'
})

User.create({
  name: 'Sally Brown',
  email: 'sally@brown.com',
  password: '123456',
  username: 'sally'
})

User.create({
  name: 'Lucy van Pelt',
  email: 'lucy@vanpelt.com',
  password: '123456',
  username: 'lucy'
})

User.create({
  name: 'Linus van Pelt',
  email: 'linus@vanpelt.com',
  password: '123456',
  username: 'linus'
})

30.times do
  User.create({
    name: Faker::Name.name,
    email: Faker::Internet.email,
    password: '123456',
    username: Faker::Internet.user_name
  })
end

100.times do
  Tweet.create({
    body: Faker::Lorem.paragraph,
    user_id: (rand * User.count).ceil
  })
end

60.times do
  Follow.create({
    followed_id: (rand * User.count).ceil,
    follower_id: (rand * User.count).ceil
  })
end
