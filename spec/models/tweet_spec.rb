require 'rails_helper'

RSpec.describe Tweet, :type => :model do

  describe 'model validations' do
    it 'requires a body' do
      expect(FactoryGirl.build(:tweet, body: '')).not_to be_valid
    end

    it 'requires the body to be no greater than 140 characters' do
      expect(
        FactoryGirl.build(:tweet, body: Faker::Lorem.characters(141))
      ).not_to be_valid
    end

    it 'requires a user id' do
      expect(FactoryGirl.build(:tweet, user_id: '')).not_to be_valid
    end
  end

  describe 'association' do
    subject(:tweet) { FactoryGirl.create(:tweet) }

    describe 'with user' do
      it 'should belong to a user' do
        expect(tweet).to respond_to(:user)
      end
    end
  end

end
