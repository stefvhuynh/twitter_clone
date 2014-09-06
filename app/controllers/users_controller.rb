class UsersController < ApplicationController
  before_filter :require_signed_in!, except: [:show, :new, :create]
  before_filter :require_signed_out!, only: [:new, :create]

  def show
    @user = User.includes(tweets: :mentioned_users).find(params[:id])

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
    render :edit
  end

  def update
    if current_user.update(user_params)
      flash.now[:notices] = ['Thanks, your settings have been saved.']
    else
      flash.now[:errors] = current_user.errors.full_messages
    end

    render :edit
  end

  def destroy
  end

  def following
    @user = User.find(params[:id])
    @followeds = @user.followeds
    render :following
  end

  def followers
    @user = User.find(params[:id])
    @followers = @user.followers
    render :followers
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :username, :avatar)
  end

end
