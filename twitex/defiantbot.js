var Twit =require('twit');

var T = new Twit({
  consumer_key:'SECRET',
  consumer_secret:'SECRET',
  access_token:'SECRET-SECRET',
  access_token_secret:'SECRET'
});


T.get('search/tweets',{q:'defiantly'}, function(err,data,response){
var tweets = data.statuses
var tweet= tweets[Math.floor(Math.random() * tweets.length)];
  var text= tweet.text;
  console.log(tweets.length)
  console.log(text)
  if(text.length > 120) {
    text = text.substring(0,120)+"...";
    T.post('statuses/update', {status:". @"+tweet.user.screen_name+"definitely*"}, function(err,data,response){
    console.log(data)
   })
  } else {
     T.post('statuses/update', {status:". @"+tweet.user.screen_name+"definitely*"}, function(err,data,response){
     console.log(data)
    })
   }


})
