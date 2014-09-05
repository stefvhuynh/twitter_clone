class Api::FollowsController < ApplicationController

  def create
    follow = Follow.new(
      followed_id: params[:user_id],
      follower_id: current_user.id
    )

    if follow.save
      @user = User.find(params[:user_id])
      render :show
    else
      render json: { errors: follow.errors.full_messages }, status: 422
    end
  end

  def destroy
    follow = current_user.followed_follows.where(
      followed_id: params[:user_id]
    ).first

    if follow.destroy
      @user = User.find(params[:user_id])
      render :show
    else
      render json: { errors: follow.errors.full_messages }, status: 422
    end
  end

end
