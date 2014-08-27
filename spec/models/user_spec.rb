require 'rails_helper'

RSpec.describe User, :type => :model do

  describe 'model validations' do
    it 'requires a name' do
      expect(FactoryGirl.build(:user, name: '')).not_to be_valid
    end

    it 'requires an email' do
      expect(FactoryGirl.build(:user, email: '')).not_to be_valid
    end

    it 'requires a unique email' do
      FactoryGirl.create(:user, email: 'me@example.com')

      expect(
        FactoryGirl.build(:user, email: 'me@example.com')
      ).not_to be_valid
    end

    it 'requires a password longer than five characters' do
      expect(FactoryGirl.build(:user, password: '')).not_to be_valid

      expect(
        FactoryGirl.build(:user, password: '12345')
      ).not_to be_valid
    end

    it 'requires a username' do
      expect(FactoryGirl.build(:user, username: '')).not_to be_valid
    end
  end

  describe 'auto-generated user attributes' do
    subject(:user) { FactoryGirl.create(:user) }

    it 'has a password digest' do
      expect(user.password_digest).not_to be_nil
    end

    it 'has a session token' do
      expect(user.session_token).not_to be_nil
    end
  end

  describe 'association' do
    subject(:user) { FactoryGirl.create(:user) }

    describe 'with tweets' do
      it 'should have many tweets' do
        expect(user).to respond_to(:tweets)
      end
    end

    describe 'with follows' do
      it 'should have many follower follows' do
        expect(user).to respond_to(:follower_follows)
      end

      it 'should have many followed follows' do
        expect(user).to respond_to(:followed_follows)
      end
    end

    describe 'with other users' do
      it 'should have many followers' do
        expect(user).to respond_to(:followers)
      end

      it 'should have many followeds' do
        expect(user).to respond_to(:followeds)
      end
    end
    
    describe 'with other user tweets' do
      it 'should have many followed user tweets' do
        expect(user).to respond_to(:followed_tweets)
      end
    end
  end

end


