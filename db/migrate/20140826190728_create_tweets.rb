class CreateTweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.text :body, null: false
      t.integer :tweeter_id, null: false

      t.timestamps
    end

    add_index :tweets, :tweeter_id
  end
end
