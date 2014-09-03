json.array! @feed do |tweet|
  json.extract! tweet, :id, :user_id, :created_at
  json.display tweet.display

  json.user do
    json.id tweet.user.id
    json.name tweet.user.name
    json.username tweet.user.username
    json.avatar_url tweet.user.avatar

    if tweet.user_id == current_user.id
      json.email tweet.user.email
    end
  end

  json.mentioned_users tweet.mentioned_users do |mentioned_user|
    json.extract! mentioned_user, :id, :name, :username
    json.avatar_url mentioned_user.avatar

    if mentioned_user == current_user
      json.email mentioned_user.email
    end
  end
end
