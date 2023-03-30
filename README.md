
# Bloxybet Giveaway Joiner


Joins giveaways on bloxybet automatically and automatically bets every 24 hours! Install NodeJS here: https://nodejs.org/en/download/
When using this GW joiner, your affiliate code will be automatically set to "gusto" to support me
## Installation

Install NodeJS to your computer, then download the github repository. Extract the files, then open install.bat. You only need to run this once.
```bash
  install.bat
```
After it has installed the modules, right click index.js and open it with notepad. Find the line that contains
```js
  const auth_keys = ['']
```

Place your auth key between the parentheses like in the example below. For help on how to get your bloxybet auth key, watch this video. https://streamable.com/vtt3u8
```js
  const auth_keys = ['authkeygoeshere']
```
Then replace discordwebookhere with your webhook. This is for notifications.
```js
  let webhook = "discordwebookhere"
```
After you saved the file, run start.bat to start the giveaway joiner. You can use multiple bloxybet accounts by seperating each auth key with a comma. Refer to example below
```js
  const auth_keys = ['authkey1', 'authkey2', 'authkey3']
```
