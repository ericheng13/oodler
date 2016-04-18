var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\Magic Conch?/;

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

  var randomnum = Math.floor((Math.random() * 20) + 1);
  if (randomnum > 18)
    {
        botResponse = "Absolutely";
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
