class RemoveOrganisationFromShifts < ActiveRecord::Migration[6.0]
  def change
    remove_reference :shifts, :organisation, null: false, foreign_key: true
  end
end
