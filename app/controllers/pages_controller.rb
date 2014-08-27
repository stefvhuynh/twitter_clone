class PagesController < ApplicationController
  before_filter :require_signed_in!

  def home
    @tweets = current_user.tweets + current_user.followed_tweets
    @tweets.sort_by! { |key| key['created_at'] }
    render :home
  end

end
