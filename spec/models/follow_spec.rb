require 'rails_helper'

RSpec.describe Follow, :type => :model do

  describe 'model validations' do
    it 'requires a followed id' do
      expect(
        FactoryGirl.build(:follow, followed_id: '')
      ).not_to be_valid
    end

    it 'requires a follower id' do
      expect(
        FactoryGirl.build(:follow, follower_id: '')
      ).not_to be_valid
    end
    
    it 'requires a unique followed-follower id combination' do
      FactoryGirl.create(:follow)
      expect(FactoryGirl.build(:follow)).not_to be_valid
    end
    
    it 'does not allow the folowed and the follower to be the same user' do
      expect(FactoryGirl.build(:follow, follower_id: 1)).not_to be_valid
    end
  end

  describe 'association' do
    subject(:follow) { FactoryGirl.create(:follow) }

    describe 'with user' do
      it 'should belong to a followed user' do
        expect(follow).to respond_to(:followed)
      end

      it 'should belong to a follower user' do
        expect(follow).to respond_to(:follower)
      end
    end
  end

end
