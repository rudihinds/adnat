class UpdateForeignKeysToUsers < ActiveRecord::Migration[6.0]
  def change
    remove_foreign_key :users, :organisations
    add_foreign_key :users, :organisations, on_delete: :cascade
  end
end
