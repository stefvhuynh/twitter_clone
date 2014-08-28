class AddPolymorphicToMentions < ActiveRecord::Migration
  def change
    add_column :mentions, :mentionable_id, :integer
    add_column :mentions, :mentionable_type, :string
  end
end
