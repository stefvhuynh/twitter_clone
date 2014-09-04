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
    @query = params[:search][:query]
    @search_results = PgSearch.multisearch(@query).map(&:searchable)

    if @query.first == '#'
      hashtag = Hashtag.find_by_name(@query[1..-1])

      unless hashtag.nil?
        @search_results = (hashtag.mentioned_tweets + @search_results).uniq
      end
    end
  end

end
