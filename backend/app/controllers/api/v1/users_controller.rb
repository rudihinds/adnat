class Api::V1::UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]
  skip_before_action :set_current_user, only: [:create]

  def create
    user = User.create( user_params )
    if user.valid?
      render json: { user: user, include: [:organisation], token: issue_token(user_id: user.id) }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :not_accepted
    end
  end

  def update  
    render json: @current_user.update(user_params)
  end

  private 

  def user_params
    params.require(:user).permit(:name, :email, :password, :organisation_id)
  end
end
