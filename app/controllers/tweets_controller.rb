class TweetsController < ApplicationController
  before_filter :require_signed_in!

  def show
  end

  def new
    render :new
  end

  def create
    @tweet = current_user.tweets.build(tweet_params)

    if @tweet.save
      redirect_to root_url
    else
      flash.now[:errors] = @tweet.errors.full_messages
      render :new
    end
  end

  private

  def tweet_params
    params.require(:tweet).permit(:body, :user_id)
  end

end
