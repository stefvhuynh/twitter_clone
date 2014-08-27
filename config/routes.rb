Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]

  shallow do
    resources :users do
      resources :tweets, except: [:index, :edit, :update]

      post 'follow', on: :member
      delete 'unfollow', on: :member
    end
  end

  root to: 'pages#home'
  get 'following', to: 'pages#following'
  get 'followers', to: 'pages#followers'
end
