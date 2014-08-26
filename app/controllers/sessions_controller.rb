class SessionsController < ApplicationController

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
      # redirect_to ...
    end
  end

  def destroy
    sign_out!
    redirect_to new_session_url
  end

end
