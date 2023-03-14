const WebSocket = require('ws');
const fetch = require('node-fetch')
let giveaways = undefined;
let joined_giveaways = [];
//You can use multiple roblox accounts by seperating each auth key with a comma.
const auth_keys = ['authkeyhere']
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
    }); response = await response.json(); console.log(response);
  };
  }catch{
    console.log("Error on join_giveaway function")
  }
}

async function main(){ console.log("Made with love by gusto_#1252"); while (true){ giveaway_check(); await new Promise((resolve) => setTimeout(resolve, 1500));}}
main()
