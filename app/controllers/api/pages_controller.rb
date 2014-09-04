class Api::PagesController < ApplicationController
  def feed
    user_tweets = current_user.tweets.includes(
      :user,
      :mentioned_users,
      :mentioned_hashtags
    )

    followed_tweets = current_user.followed_tweets.includes(
      :user,
      :mentioned_users,
      :mentioned_hashtags
    )

    @feed = followed_tweets + user_tweets
    @feed.sort_by! { |tweet| Time.now - tweet.created_at }
    render :feed
  end
end