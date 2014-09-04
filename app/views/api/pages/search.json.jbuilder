json.users @users do |user|
  json.id user.id
  json.name user.name
  json.username user.username
  json.avatar_url user.avatar
end

json.tweets @tweets do |tweet|
  json.extract! tweet, :id, :user_id, :created_at
  json.display tweet.display

  json.user do
    json.id tweet.user.id
    json.name tweet.user.name
    json.username tweet.user.username
    json.avatar_url tweet.user.avatar
  end

  json.mentioned_users tweet.mentioned_users do |mentioned_user|
    json.extract! mentioned_user, :id, :name, :username
    json.avatar_url mentioned_user.avatar
  end
end