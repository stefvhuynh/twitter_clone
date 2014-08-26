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
  end

  describe 'auto-generated user attributes' do
    subject(:user) { FactoryGirl.create(:user) }

    it 'has a username' do
      expect(user.username).not_to be_nil
    end

    it 'has a password digest' do
      expect(user.password_digest).not_to be_nil
    end

    it 'has a session token' do
      expect(user.session_token).not_to be_nil
    end
  end

end


