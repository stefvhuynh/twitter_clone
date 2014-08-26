require 'rails_helper'

RSpec.describe Tweet, :type => :model do

  describe 'model validations' do
    it 'requires a body' do
      expect(FactoryGirl.build(:tweet, body: '')).not_to be_valid
    end

    it 'requires the tweeter id' do
      expect(FactoryGirl.build(:tweet, tweeter_id: '')).not_to be_valid
    end
  end

end
