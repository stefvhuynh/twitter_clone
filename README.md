Twitter Clone
=============

I cloned the [Twitter](http://twitter.com) website to practice my Rails and BackboneJS skills.
I first wrote a simple MVP in Rails and then transferred it over to BackboneJS. I then started
adding features straight to BackboneJS. However, a lot of the app is still functional via Rails.

My app allows users to sign up and sign in. Users can also do both through [Facebook](http://facebook.com)
via the Facebook API. Once users sign in, they can find people to follow by typing into a search bar.
The search bar uses the [PGSearch gem](https://github.com/Casecommons/pg_search) to find all users who
have the search query and all tweets that have the query in the body of the tweet.

Once users are following other users, their feed is populated with the tweets from these other users, as
well as their own tweets.  More tweets are loaded when the user scrolls to the bottom. I implemented this 
infinite scroll, using the [Kaminari gem](https://github.com/amatsuda/kaminari) and some listeners in
BackboneJS.

Users can view other users' profiles to view their tweets, who they're following, and who is following them.

Lastly, when users tweet, they can mention users with the @ symbol and create hashtags with the # symbol. 
I parse the tweets for these symbols and find the matching users and hashtags in the database. When I
display the tweets, I add links to the users' show pages. Users can also see all the tweets that mention 
them in the notifications tab. On the other hand, when users click on the hashtag links, they actually 
perform a search for that hashtag, much like how the real Twitter does it.
