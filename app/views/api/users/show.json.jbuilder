json.extract! @user, :id, :name, :username
json.avatar_url @user.avatar

json.tweets @user.tweets
  .includes(:mentioned_users, :mentioned_hashtags) do |tweet|

  json.extract! tweet, :id, :user_id, :created_at
  json.display tweet.display

  json.mentioned_users tweet.mentioned_users do |mentioned_user|
    json.extract! mentioned_user, :id, :name, :username
    json.avatar_url mentioned_user.avatar
  end

  # json.mentioned_hashtags tweet.mentioned_hashtags do |mentioned_hashtag|
  #   json.extract! mentioned_hashtag, :id, :name
  # end
end

json.followeds @user.followeds do |followed|
  json.extract! followed, :id, :name, :username
  json.avatar_url followed.avatar
end

json.followers @user.followers do |follower|
  json.extract! follower, :id, :name, :username
  json.avatar_url follower.avatar
end
