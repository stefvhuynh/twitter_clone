class Api::PagesController < ApplicationController
  def feed
    user_tweets = current_user.tweets.includes(
      :mentioned_users,
      :mentioned_hashtags
    )

    followed_tweets = current_user.followed_tweets.includes(
      :user,
      :mentioned_users,
      :mentioned_hashtags
    )

    @current_user = current_user
    @feed = user_tweets + followed_tweets
    @feed.sort_by! { |tweet| Time.now - tweet.created_at }
    sleep 3
    render :feed
  end
end