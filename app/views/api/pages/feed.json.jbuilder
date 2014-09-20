json.feed @feed do |tweet|
  json.extract! tweet, :id, :user_id
  json.created_at tweet.created_at.strftime('%b %e %I:%M %p UTC')
  json.display tweet.display

  json.user do
    json.id tweet.user.id
    json.name tweet.user.name
    json.username tweet.user.username
    json.avatar_url tweet.user.avatar
  end

  json.mentioned_users tweet.mentioned_users do |mentioned_user|
    json.extract! mentioned_user, :id, :name, :username
    json.avatar_url mentioned_user.avatar
  end
end

json.page_number @page_number
json.total_pages @total_pages

