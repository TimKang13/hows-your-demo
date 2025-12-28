class AddTimestampToComments < ActiveRecord::Migration[8.1]
  def change
    add_column :comments, :timestamp, :decimal, precision: 10, scale: 3, null: false, default: 0
  end
end
