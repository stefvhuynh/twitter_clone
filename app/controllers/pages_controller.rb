class PagesController < ApplicationController
  before_filter :require_signed_in!

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
    @query = params[:search][:query]
    @search_results = PgSearch.multisearch(@query).map(&:searchable)
  end

end
