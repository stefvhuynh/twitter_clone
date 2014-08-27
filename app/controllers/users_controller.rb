class UsersController < ApplicationController
  before_filter :require_signed_in!, except: [:new, :create]
  before_filter :require_signed_out!, only: [:new, :create]

  def index
    # Will refine based on search criteria provided by the user
    @users = User.all
    render :index
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def edit
  end

  def update
  end

  def destroy
  end
  
  def follow
    follow = Follow.new(
      followed_id: params[:id],
      follower_id: current_user.id
    )
        
    unless follow.save
      flash[:errors] = follow.errors.full_messages 
    end
    
    redirect_to user_url(params[:id])
  end
  
  def unfollow
    follow = Follow.where(
      followed_id: params[:id], 
      follower_id: current_user.id 
    ).first
    
    unless follow.destroy
      flash[:errors] = follow.errors.full_messages
    end
    
    redirect_to user_url(params[:id])
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end

end
