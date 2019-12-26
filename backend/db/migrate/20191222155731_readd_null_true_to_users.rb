class ReaddNullTrueToUsers < ActiveRecord::Migration[6.0]
  def change
    remove_foreign_key :users, :organisations
    add_foreign_key :users, :organisations, null:true, on_delete: :cascade
  end
end

