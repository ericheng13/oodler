var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /Magic Conch?/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  var randomnum = Math.floor((Math.random() * 50) + 1);
  if (randomnum > 48)
    {
        botResponse = "Absolutely";
    }
    else if (randomnum > 46)
    {
        botResponse = "http://gif-finder.com/wp-content/uploads/2015/08/Dwight-YesYes.gif";
    }
    else if (randomnum > 44)
    {
        botResponse = "( ͡° ͜ʖ ͡°)";
    }
    else if (randomnum > 42)
    {
        botResponse = "What the fuck did you just fucking say about me, you little bitch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I’m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You’re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that’s just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You’re fucking dead, kiddo.";
    }
    else if (randomnum > 40)
    {
        botResponse = "https://tctechcrunch2011.files.wordpress.com/2011/05/thumbs.png";
    }
    else if (randomnum > 38)
    {
        botResponse = "http://www.reactiongifs.us/wp-content/uploads/2013/08/shaking_head_breaking_bad.gif";
    }
    else if (randomnum > 36)
    {
        botResponse = "Nope";
    }
    else if (randomnum > 34)
    {
        botResponse = "Yeah sure whatever";
    }
    else if (randomnum > 32)
    {
        botResponse = "Taxation is theft";
    }
    else if (randomnum > 30)
    {
        botResponse = "Jet fuel can't melt steel beams";
    }
    else if (randomnum > 28)
    {
        botResponse = "Bush did 9/11";
    }
    else if (randomnum > 26)
    {
        botResponse = "https://nacidaeldocedejulio.files.wordpress.com/2014/05/hahahaha-no-107105163314.png";
    }
    else if (randomnum > 24)
    {
        botResponse = "http://www.reactiongifs.us/wp-content/uploads/2014/07/yes_snoop_dogg.gif";
    }
    else if (randomnum > 22)
    {
        botResponse = "https://pixabay.com/static/uploads/photo/2014/04/03/10/08/chef-309934_960_720.png";
    }
    else if (randomnum > 20)
    {
        botResponse = "Nein";
    }
    else if (randomnum > 18)
    {
        botResponse = "By all means";
    }
    else if (randomnum > 16)
    {
        botResponse = "Probably";
    }
    else if (randomnum > 14)
    {
        botResponse = "Yes";
    }
    else if (randomnum > 12)
    {
        botResponse = "Sure, why not";
    }
    else if (randomnum > 10)
    {
        botResponse = "Maybe...?";
    }
    else if (randomnum > 8)
    {
        botResponse = "Not sure, try again later";
    }
    else if (randomnum > 6)
    {
        botResponse = "No";
    }
    else if (randomnum > 4)
    {
        botResponse = "I don't think so";
    }
    else if (randomnum > 3)
    {
        botResponse = "Negative";
    }
    else if (randomnum > 2)
    {
        botResponse = "No, and you should feel bad for asking";
    }
    else if (randomnum > 1)
    {
        botResponse = "No way";
    }
    else botResponse = "You're an idiot";


  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
