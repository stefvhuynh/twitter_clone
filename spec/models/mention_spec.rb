require 'rails_helper'

RSpec.describe Mention, :type => :model do

  describe 'model validations' do
    it 'requires a tweet id' do
      expect(FactoryGirl.build(:mention, tweet_id: '')).not_to be_valid
    end

    it 'requires a user id' do
      expect(FactoryGirl.build(:mention, user_id: '')).not_to be_valid
    end
  end

  describe 'association' do
    subject(:mention) { FactoryGirl.create(:mention) }

    describe 'with tweets' do
      it 'belongs to a tweet' do
        expect(mention).to respond_to(:tweet)
      end
    end

    describe 'with users' do
      it 'belongs to a user' do
        expect(mention).to respond_to(:user)
      end
    end
  end

end
