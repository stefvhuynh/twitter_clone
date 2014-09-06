Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]

  shallow do
    resources :users do
      get 'following', on: :member
      get 'followers', on: :member

      resources :tweets, except: [:index, :new, :edit, :update]
      resource :follows, only: [:create, :destroy]
    end
  end

  # root to: 'pages#home'
  root to: 'pages#root'
  get 'mentions', to: 'pages#mentions'
  get 'search', to: 'pages#search'

  get 'auth/facebook/callback', to: 'sessions#oauth'

  namespace :api, defaults: { format: :json } do
    get 'feed', to: 'pages#feed'
    get 'search', to: 'pages#search'
    
    resources :users, only: [:show, :update, :destroy]
    resources :tweets, except: [:index, :new, :edit, :update]
    resource :follows, only: [:create, :destroy]
  end
end
