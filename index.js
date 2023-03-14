const WebSocket = require('ws');
const fetch = require('node-fetch')
let giveaways = undefined;
let joined_giveaways = [];

// If you set this to true, it will auto gamble if it has the error "You must have bet in the past 24h to join a giveaway!"
let auto_gambling = false;
// If auto_gambling is true, it will gamble items equal to or less than the number specified
let auto_gamble_max_value = 10;

const auth_keys = ['authkeyhere']
let webhook = "webhookhere"



async function send_webhook(id, name, value, check, errormsg){
  let message = {
      'content': '@everyone',
      'embeds': [
        {
          'title': 'Joined giveaway \uD83C\uDF89',
          'description': `Item: ${name}\nValue: ${value}\nGiveaway ID: ${id}`,
          'color': 5814783,
          'footer': {
            'text': 'Made by gusto_#1252'
          }
        }
      ],
      'attachments': []
    }
  if (check === 1){
    message = {
      'content': '@everyone',
      'embeds': [
        {
          'title': 'Failed to join giveaway :warning:',
          'description': `Error message: ${JSON.stringify(errormsg)}`,
          'color': 5814783,
          'footer': {
            'text': 'Made by gusto_#1252'
          }
        }
      ],
      'attachments': []
    }
  }
  fetch(webhook, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify(message)
});
}

async function giveaway_check() {
  try{
    const ws = new WebSocket('wss://bloxyapi.com/api/giveaway_ws');
    
    ws.on('message', (data) => {
      const giveaway = JSON.parse(data.toString());
      if (joined_giveaways.indexOf(giveaway['_id']) === -1){
        join_giveaway(giveaway['_id'], giveaway['item']['display_name'], giveaway['item']['value']);
        joined_giveaways.push(giveaway['_id'])
      }
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    ws.close();
  }catch{
    console.log("Error on giveaway check function")
  }
}

async function create_bet(display_name, game_name, name, uid, key){
const formDataString = `------WebKitFormBoundaryVFP0LaD2LQbRWsxN\r\nContent-Disposition: form-data; name="items"\r\n\r\n[{ "display_name": "${display_name}", "game_name": "${game_name}", "name": "${name}", "thumbnail": "https://tr.rbxcdn.com/bd9a3a60942e3f8fb84d736aabe17e18/420/420/Image/Png", "uid": "${uid}", "value": 13 }]\r\n------WebKitFormBoundaryVFP0LaD2LQbRWsxN\r\nContent-Disposition: form-data; name="side"\r\n\r\nheads\r\n------WebKitFormBoundaryVFP0LaD2LQbRWsxN--\r\n`;

  let response = await fetch('https://bloxyapi.com/api/create', {
  method: 'POST',
  headers: {
    'accept': '*/*',
    'authorization': key,
    'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryVFP0LaD2LQbRWsxN'
  },
  body: formDataString
}); response = await response.json();
  console.log(response);
}

async function auto_gamble(key){
  let response = await fetch('https://bloxyapi.com/api/inventory', {
  headers: {
    'accept': '*/*',
    'authorization': key,
  }
}); response = await response.json()
  let found = false;
  if (response['inventory'].length>0){
      for (let x in response['inventory']){
      if (response['inventory'][x]['value'] <= auto_gamble_max_value){
        create_bet(response['inventory'][x]['display_name'], response['inventory'][x]['game_name'], response['inventory'][x]['name'], response['inventory'][x]['uid'])
        found = true;
        break;
      }
    }
    if (found === false){console.log(`You have no items equal to or under ${auto_gamble_max_value} value.`) }
  } else{
    console.log("Failed to autogamble, have no items to gamble!")
  }
}

async function join_giveaway(id, name, value){
  try{
    console.log(`Found giveaway | Item: ${name} - ${value} value |  Giveaway ID ${id}`)
  for (let y in auth_keys){
    let response = await fetch('https://bloxyapi.com/api/join_giveaway', {
    method: 'POST',
    headers: { 'authorization': auth_keys[y], 'content-type': 'application/json', },
    body: JSON.stringify({ 'giveaway_id': id })
    }); response = await response.json();
    if (response['message'] === 'success'){
      console.log(response)
      send_webhook(id, name, value, 0, response)
    } else if (response['message'] === 'You must have bet in the past 24h to join a giveaway!' && auto_gambling === true){
      console.log(response)
      console.log(`Auto gambling item thats ${auto_gamble_max_value} value, or under.`)
      auto_gamble(auth_keys[y])
    } else{
      console.log(response);
      send_webhook(id, name, value, 1, response)
    }
    
  };
  }catch{
    console.log("Error on join_giveaway function")
  }
}

async function main(){ console.log("Made with love by gusto_#1252\nJoiner started, waiting for giveaways."); while (true){ giveaway_check(); await new Promise((resolve) => setTimeout(resolve, 1500));}}
main()
