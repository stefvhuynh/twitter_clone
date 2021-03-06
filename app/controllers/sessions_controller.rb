class SessionsController < ApplicationController
  before_filter :require_signed_out!, except: :destroy

  def new
    render :new
  end

  def create
    user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if user.nil?
      flash.now[:errors] = [
        "The username and password you entered did not match
        our records. Please double-check and try again."
      ]

      render :new
    else
      sign_in!(user)
      redirect_to root_url
    end
  end

  def oauth
    user = User.find_or_create_by_oauth!(request.env['omniauth.auth'])
    sign_in!(user)
    redirect_to root_url
  end

  def destroy
    sign_out!
    # redirect_to new_session_url
    render nothing: true, status: 200
  end

end
