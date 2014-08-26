class PagesController < ApplicationController
  before_filter :require_signed_in!

  def home
    @tweets = current_user.tweets
    render :home
  end

end
