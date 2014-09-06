json.extract! @user, :id, :name, :username
json.avatar_url @user.avatar

if @user == current_user
  json.email @user.email
end

json.tweets @tweets do |tweet|

  json.extract! tweet, :id, :user_id, :created_at
  json.display tweet.display

  json.mentioned_users tweet.mentioned_users do |mentioned_user|
    json.extract! mentioned_user, :id, :name, :username
    json.avatar_url mentioned_user.avatar
  end
end

json.tweet_count @user.tweets.count
json.followed_count @user.followeds.count
json.follower_count @user.followers.count

json.page_number @page_number
json.total_pages @total_pages

# Consider splitting these two out into different ajax calls to limit the
# amount of data being sent down.

json.followeds @user.followeds do |followed|
  json.extract! followed, :id, :name, :username
  json.avatar_url followed.avatar
end

json.followers @user.followers do |follower|
  json.extract! follower, :id, :name, :username
  json.avatar_url follower.avatar
end
