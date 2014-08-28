class DropUserIdFromMentions < ActiveRecord::Migration
  def change
    remove_column :mentions, :user_id
  end
end
