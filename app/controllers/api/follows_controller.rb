class Api::FollowsController < ApplicationController

  def create
    follow = Follow.new(
      followed_id: params[:user_id],
      follower_id: current_user.id
    )

    unless follow.save
      flash[:errors] = follow.errors.full_messages
    end

    redirect_to user_url(params[:user_id])
  end

  def destroy
    follow = current_user.followed_follows.where(
      followed_id: params[:user_id]
    ).first

    unless follow.destroy
      flash[:errors] = follow.errors.full_messages
    end

    redirect_to user_url(params[:user_id])
  end

end
