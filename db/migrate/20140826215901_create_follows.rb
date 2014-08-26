class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|
      t.integer :followed_id, null: false
      t.integer :follower_id, null: false

      t.timestamps
    end

    add_index :follows, [:followed_id, :follower_id], unique: true
  end
end
