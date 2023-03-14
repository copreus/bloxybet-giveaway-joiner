
# Bloxybet Giveaway Joiner


Joins giveaways on bloxybet automatically! Install NodeJS here: https://nodejs.org/en/download/

## Replit 24/7 Free Hosting
You can either fork this repl. (NOT RECOMMENDED as users can see who forked the repl and steal your bloxybet auth token)
```https://replit.com/@gusto20000/bloxybet-giveaway-joiner#index.js
```
Or download the repl and upload it to a new repl from here. This is RECOMMENDED
``` 
https://replit.com/@gusto20000/bloxybet-giveaway-joiner.zip 
```
Read the instructions.txt file for more details

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
After you saved the file, run start.bat to start the giveaway joiner. You can use multiple bloxybet accounts by seperating each auth key with a comma. Refer to example below
```js
  const auth_keys = ['authkey1', 'authkey2', 'authkey3']
```
