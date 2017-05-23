var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;


function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^(U|u)(nuhi|NUHI)/;
      botRegexRC = /(((R|r)(oller|OLLER)(| )(C|c)(oaster|OASTER))|((H|h)(AWAI('|)I|awai('|)i)))/
  var str = request.text;
  var h_alph = ['a', 'e', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'u', 'w', "'" ];
  var not_h_alph = ['b', 'c', 'd', 'f', 'g', 'j', 'q', 'r', 's', 't', 'v', 'x', 'y', 'z'];
  var h_alph_caps = ['A', 'E', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'U', 'W', "'" ];
  var not_h_alph_caps = ['B', 'C', 'D', 'F', 'G', 'J', 'Q', 'R', 'S', 'T', 'V', 'X', 'Y', 'Z'];



  var newstring = [];
var i;
for (i = 6; i < str.length; i++) {
   if (not_h_alph.indexOf(str.substr(i,1)) >= 0)
   {
      newstring[i] = h_alph[Math.floor(Math.random()*13)];//h_alph[Math.random()*13];
   }
   else if (not_h_alph_caps.indexOf(str.substr(i,1)) >= 0)
   {
      newstring[i] = h_alph_caps[Math.floor(Math.random()*13)];//h_alph[Math.random()*13];
   }
   else
   {
      newstring[i] = str.substr(i,1);
   }
}

var finalstring = (newstring.toString()).replace(/,/g, '');







  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(finalstring);
    this.res.end();
  } else if(request.text && botRegexRC.test(request.text)) {
      this.res.writeHead(200);
      postMessage("https://youtu.be/nXpB1rixnPQ");
      this.res.end();
  }else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(text) {
  var botResponse, options, body, botReq;

        botResponse = text;


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
