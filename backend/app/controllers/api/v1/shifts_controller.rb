class Api::V1::ShiftsController < ApplicationController
  require 'date'

  skip_before_action :authorize, only: [:index]
  skip_before_action :set_current_user, only: [:index]

  def index
    org = Organisation.find(3)
    render json: org.shifts, include: { user: { only: [:name, :email] } }
  end

  def create
    shift_start = params[:shift][:shift_date] + " " + params[:shift][:start_time]
    shift_end = params[:shift][:shift_date] + " " + params[:shift][:shift_finish]
  
    shift = Shift.create(
      start: shift_start,
      end: shift_end,
      break_length: params[:shift][:break_length],
      user_id: @current_user.id
    )

      if shift.valid?
        render json: shift.get_formatted_shift
      else
        render json: { errors: shift.errors.full_messages }, status: :not_accepted
      end
    end



  private
  def shift_params
    params.require(:shift).permit(:start, :end, :break_length, :user_id)
  end

end

