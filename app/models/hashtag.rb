class Hashtag < ActiveRecord::Base
  include PgSearch
  multisearchable against: :name
  
  has_many :mentions, as: :mentionable
  has_many :mentioned_tweets, through: :mentions, source: :tweet

  validates :name, presence: true, uniqueness: true
  validate :name_can_only_contain_valid_characters
  
  private
  
  def name_can_only_contain_valid_characters
    if self.name =~ /[^a-zA-Z0-9_]/
      errors[:name] << 'Name can only contain letters, numbers, 
        and underscores.'
    end
  end
  
end
