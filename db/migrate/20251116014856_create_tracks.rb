class CreateTracks < ActiveRecord::Migration[8.1]
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.references :user, null:false, foreign_key: true

      t.timestamps
    end

    add_index :tracks, [:user_id, :title], unique: true
  end
end
