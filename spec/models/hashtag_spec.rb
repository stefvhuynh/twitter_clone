require 'rails_helper'

RSpec.describe Hashtag, :type => :model do

  describe 'model validations' do
    it 'requires a name' do
      expect(FactoryGirl.build(:hashtag, name: '')).not_to be_valid
    end

    it 'requires a unique name' do
      FactoryGirl.create(:hashtag, name: 'adorbz')
      expect(FactoryGirl.build(:hashtag, name: 'adorbz')).not_to be_valid
    end
  end

  describe 'association' do

  end
end
