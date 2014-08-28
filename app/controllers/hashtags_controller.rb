class HashtagsController < ApplicationController

  def show
    @hashtag = Hashtag.find(params[:id])
    render :show
  end

  private

  def hashtag_params
    params.require(:hashtag).permit(:name)
  end

end
