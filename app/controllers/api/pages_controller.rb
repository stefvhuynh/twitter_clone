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

    @feed = user_tweets + followed_tweets
    @feed.sort_by! { |tweet| Time.now - tweet.created_at }
    render :feed
  end

  def search
    @query = params[:query]
    search_results = PgSearch.multisearch(@query)
      .includes(:searchable)
      .map(&:searchable)

    @users = search_results.select { |result| result.is_a?(User) }
    @tweets = search_results.select { |result| result.is_a?(Tweet) }

    if @query.first == '#'
      hashtag = Hashtag.find_by_name(@query[1..-1])
      @tweets = (hashtag.mentioned_tweets + @tweets).uniq unless hashtag.nil?
    end

    render :search
  end

end