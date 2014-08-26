Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]

  shallow do
    resources :users do
      resources :tweets, except: [:index, :edit, :update]
    end
  end

  root to: 'pages#home'
end
