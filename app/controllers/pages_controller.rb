class PagesController < ApplicationController
  before_filter :require_signed_in!

  def root
    render :root
  end

  def home
    user_tweets = current_user.tweets.includes(
      :mentioned_users,
      :mentioned_hashtags
    )

    followed_tweets = current_user.followed_tweets.includes(
      :mentioned_users,
      :mentioned_hashtags
    )

    @tweets = user_tweets + followed_tweets
    @tweets.sort_by! { |tweet| Time.now - tweet.created_at }
    render :home
  end

  def mentions
    @mentioned_tweets = current_user.mentioned_tweets.order('created_at DESC')
    render :mentions
  end

  def search
    @query = params[:query]
    search_results = PgSearch.multisearch(@query)
      .includes(:searchable)
      .map(&:searchable)

    @users = search_results.select { |result| result.is_a?(User) }
    @tweets = search_results.select { |result| result.is_a?(Tweet) }

    if @query.first == '#'
      @tweets = (hashtag.mentioned_tweets + @tweets).uniq unless hashtag.nil?
    end
  end

end
