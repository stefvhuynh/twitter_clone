class Api::UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    # FOR INFINITE SCROLL
    @tweets = User.tweets.includes(:mentioned_users).page(params[:page]).per(10)
    render :show
  end

  def update
    if current_user.update(user_params)
      @user = current_user
      render :show
    else
      render json: { errors: current_user.errors.full_messages }, status: 422
    end
  end

  def destroy
  end

  # def following
  #   user = User.find(params[:id])
  #   @followeds = user.followeds
  #   render :following
  # end
  #
  # def followers
  #   user = User.find(params[:id])
  #   @followers = user.followers
  #   render :followers
  # end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :username, :avatar)
  end

end
