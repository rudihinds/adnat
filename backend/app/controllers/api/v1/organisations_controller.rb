class Api::V1::OrganisationsController < ApplicationController

  skip_before_action :authorize, only: [:index, :get_orgs_shifts]
  skip_before_action :set_current_user, only: [:index, :get_orgs_shifts]

  

  def index
    render json: Organisation.all
  end

  def create
    org = Organisation.create(org_params)
    if org.valid?
      @current_user.organisation_id = org.id
      @current_user.save
      render json: { user: @current_user, org: org }
    else
      render json: { errors: user.errors.full_messages }, status: :not_accepted
      # render errors
    end
  end

  def update
    org = Organisation.find(params[:id])
    org.update_attributes(org_params)
    render json: org
  end

  def destroy
    org = Organisation.find(params[:id])
    org.delete
    render json: {action: 'deleted'}
  end

  def get_orgs_shifts
    org = Organisation.find(params[:id])
    formatted_shifts = org.get_shifts_for_org
    render json: formatted_shifts
  end

  private

  def org_params
    params.require(:organisation).permit(:name, :hourly_rate)
  end


end
