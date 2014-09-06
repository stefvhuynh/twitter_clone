json.feed @feed do |tweet|
  json.extract! tweet, :id, :user_id, :created_at
  json.display tweet.display

  json.user do
    json.id tweet.user.id
    json.name tweet.user.name
    json.username tweet.user.username
    json.avatar_url tweet.user.avatar
    
    json.tweet_count tweet.user.tweets.count
    json.followed_count tweet.user.followeds.count
    json.follower_count tweet.user.followers.count
  end

  json.mentioned_users tweet.mentioned_users do |mentioned_user|
    json.extract! mentioned_user, :id, :name, :username
    json.avatar_url mentioned_user.avatar
  end
end

json.page_number @page_number
json.total_pages @total_pages

