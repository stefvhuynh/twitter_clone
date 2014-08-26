class TweetsController < ApplicationController

  def show
  end

  def new
    render :new
  end

  def create
    @tweet = current_user.tweets.build(tweet_params)

    if @tweet.save
      # redirect_to ...
    else
      render :new
    end
  end

  private

  def tweet_params
    params.require(:tweet).permit(:body, :user_id)
  end

end
