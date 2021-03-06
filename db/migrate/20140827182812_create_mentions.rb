class CreateMentions < ActiveRecord::Migration
  def change
    create_table :mentions do |t|
      t.integer :tweet_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end

    add_index :mentions, :tweet_id
    add_index :mentions, :user_id
  end
end
