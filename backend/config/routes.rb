Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :shifts
      resources :users
      resources :organisations

      post '/login', to: 'auth#create'
      get '/validate', to: 'auth#validate'
      get '/organisations/:id/shifts', to: 'organisations#get_orgs_shifts'
      

      # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
    end
  end
end
