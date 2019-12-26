class Users < ActiveRecord::Migration[6.0]
  def change
    change_column :users, :organisation_id, :bigint, null:true
  end
end
