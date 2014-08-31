# json.extract! @tweet, :id, :user_id, :created_at
# json.display @tweet.display
#
# json.mentioned_users @tweet.mentioned_users do |mentioned_user|
#   json.extract! mentioned_user, :id, :name, :username, :email
#   json.avatar_url mentioned_user.avatar
#
#   json.tweets mentioned_user.tweets do |tweet|
#     json.extract! tweet, :id, :user_id, :created_at
#     json.display tweet.display
#   end
# end
#
# json.mentioned_hashtags @tweet.mentioned_hashtags do |mentioned_hashtag|
#   json.extract! mentioned_hashtag, :id, :name
#
#   json.tweets mentioned_hashtag.mentioned_tweets do |tweet|
#     json.extract! tweet, :id, :user_id, :created_at
#     json.display tweet.display
#   end
# end