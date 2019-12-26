class Api::V1::AuthController < ApplicationController
    
  skip_before_action :authorize, only: [:create]
  # skip_before_action :set_current_user, only: [:create]


  def create
      user = User.find_by(email: user_login_params[:email])
      if user && user.authenticate(user_login_params[:password])
          render json: { user: user, token: issue_token(user_id: user.id) }, status: :accepted
      else
          render json: { errors: user.errors.full_messages }, status: :unauthorized
      end
  end

  def validate
      user = @current_user
      if user
          render json: { user: user, token: issue_token(user_id: user.id) }, status: :accepted
      else 
          render json: { errors: ['invalid token']}, status: :unauthorized
      end
  end

  private

  def user_login_params
      params.require(:user).permit(:email, :password)
  end
end 