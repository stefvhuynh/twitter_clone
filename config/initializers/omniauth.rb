Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['FACEBOOK_ACCESS_KEY_ID'], ENV['FACEBOOK_SECRET_ACCESS_KEY']
end