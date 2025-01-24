Rails.application.routes.draw do
  root 'static_pages#home'

  namespace :api do
    # USERS
    post '/users'                  => 'users#create'

    # SESSIONS
    post '/sessions'               => 'sessions#create'
    get  '/authenticated'          => 'sessions#authenticated'
    delete '/sessions'             => 'sessions#destroy'

    # TWEETS
    post '/tweets'                 => 'tweets#create'
    get  '/tweets'                 => 'tweets#index'
    delete '/tweets/:id'           => 'tweets#destroy'
    get  '/users/:username/tweets' => 'tweets#index_by_user'
    get  '/tweets/search/:keyword' => 'tweets#search'
  end

  # Include ActiveStorage routes
  require 'active_storage/engine'
  Rails.application.routes.draw do
    # Other routes...
    get '*path' => 'static_pages#home', constraints: lambda { |req|
      req.path.exclude? 'rails/active_storage'
    }
  end
end