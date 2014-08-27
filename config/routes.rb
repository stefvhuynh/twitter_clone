Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]

  shallow do
    resources :users do
      resources :tweets, except: [:index, :edit, :update]
      get 'following', to: 'users#following'
      get 'followers', to: 'users#followers'

      post 'follow', on: :member
      delete 'unfollow', on: :member
    end
  end

  root to: 'pages#home'
  get 'mentions', to: 'pages#mentions'
end
