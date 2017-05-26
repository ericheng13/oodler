var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;


function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^(U|u)(nuhi|NUHI)/;
      botRegexRC = /(((R|r)(oller|OLLER)(| )(C|c)(oaster|OASTER))|((H|h)(AWAI('|)I|awai('|)i)))/
      botRegexInspire = /(K|k)(ANALOA|analoa)(| )((T|t)(EACH|each)|(I|i)(NSPIRE|nspire))/
      botRegexLove = /(K|k)(ANALOA|analoa)(| )(L|l)(OVE|ove)(S|s|)(| )/

  var str = request.text;
  var h_alph = ['a', 'e', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'u', 'w', "'" ];
  var not_h_alph = ['b', 'c', 'd', 'f', 'g', 'j', 'q', 'r', 's', 't', 'v', 'x', 'y', 'z'];
  var h_alph_caps = ['A', 'E', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'U', 'W', "'" ];
  var not_h_alph_caps = ['B', 'C', 'D', 'F', 'G', 'J', 'Q', 'R', 'S', 'T', 'V', 'X', 'Y', 'Z'];
  var inspire = [
    "'Strive to reach the highest.'\n -Kulia i ka nu’u",
    "'Unfolded by the water are the faces of the flowers.'\n -Mohala i ka wai ka maka o ka pua",
    "'There is life in a kindly reply.'\n -Ua ola no i ka pane a ke aloha",
    "'No kind deed has ever lacced its reward.'\n -`A`ohe lokomaika`i i nele i ke pâna`i",
    "'Dare to dance, leave shame at home.'\n -A’a i ka hula, waiho i ka maka’u i ka hale",
    "'No cliff is so tall it cannot be climbed.'\n -‘A’OHE PU’U KI’EKI’E KE HO’A’O ‘IA E PI’I",
    "'It is natural for people to behave in a loving way.'\n -Ua Kuluma Ke Kanaka I Ke Aloha",
    "'A humble person walks carefully so as not to hurt others.'\n -Ku’ia kahele aka na’au ha’aha’a",
    "'Always Take An Offering With You. Make Every Person Place or Condition Better Than You Left It Always. Wherever You Go, Always Take Something With You.'\n -E hele me ka pu’olo"
  ];

  var love = [
    "Love all you see, including yourself.",
    "May our love last forever.",
    "I give my love to you, you give your love to me.",
    "Distance is ignored by love.",
    "Love gives life within.",
    "Love is like a cleansing dew.",
    "Joy is in the voice of love.",
    "Let us fall in love all over again.",
    "From this day, from this night, forever more.",
    "Where the hands move, there let the eyes follow."
  ];

var inspireString = inspire[Math.floor(Math.random()*inspire.length)];
var loveString = love[Math.floor(Math.random()*love.length)];

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
  } else if(request.text && botRegexInspire.test(request.text)) {
      this.res.writeHead(200);
      postMessage(inspireString);
      this.res.end();
  } else if(request.text && botRegexLove.test(request.text)) {
      this.res.writeHead(200);
      postMessage(loveString);
      this.res.end();
  } else {
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
