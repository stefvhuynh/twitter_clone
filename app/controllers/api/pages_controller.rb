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
    
    @feed = Kaminari.paginate_array(@feed).page(params[:page]).per(15)
    @page_number = params[:page] || 1
    @total_pages = @feed.total_pages
    
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
    
    @tweets = Kaminari.paginate_array(@tweets).page(params[:page]).per(15)
    @page_number = params[:page] || 1
    @total_pages = @tweets.total_pages
    render :search
  end
  
  def mentions
    @feed = current_user.mentioned_tweets.page(1).per(10)
    @page_number = 1
    @total_pages = @feed.total_pages
    render :feed
  end

end