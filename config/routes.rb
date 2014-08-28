Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]
  resources :hashtags, only: [:show, :create]

  shallow do
    resources :users do
      resources :tweets, except: [:index, :edit, :update]
      get 'following', to: 'users#following'
      get 'followers', to: 'users#followers'

      resource :follows, only: [:create, :destroy]
    end
  end

  root to: 'pages#home'
  get 'mentions', to: 'pages#mentions'

  get 'auth/facebook/callback', to: 'sessions#oauth'
end
