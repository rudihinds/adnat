class AddOrganisationToShifts < ActiveRecord::Migration[6.0]
  def change
    add_reference :shifts, :organisation, null: false, foreign_key: true
  end
end
