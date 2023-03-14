const WebSocket = require('ws');
const fetch = require('node-fetch')
let giveaways = undefined;
let joined_giveaways = [];

const auth_keys = ['authtokenhere']
let webhook = "discordwebookhere"

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
      send_webhook(id, name, value, 0, response)
    } else{
      send_webhook(id, name, value, 1, response)
    }
    
  };
  }catch{
    console.log("Error on join_giveaway function")
  }
}

async function main(){ console.log("Made with love by gusto_#1252\nJoiner started, waiting for giveaways."); while (true){ giveaway_check(); await new Promise((resolve) => setTimeout(resolve, 1500));}}
main()
