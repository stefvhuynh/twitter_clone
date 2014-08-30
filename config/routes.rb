Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]
  resources :hashtags, only: :show

  shallow do
    resources :users do
      resources :tweets, except: [:index, :edit, :update]
      get 'following', on: :member
      get 'followers', on: :member

      resource :follows, only: [:create, :destroy]
    end
  end

  root to: 'pages#home'
  get 'mentions', to: 'pages#mentions'
  get 'search', to: 'pages#search'

  get 'auth/facebook/callback', to: 'sessions#oauth'
  
  namespace :api do
    resources :users, only: [:show, :update, :destroy] do
      
    end
  end
end
