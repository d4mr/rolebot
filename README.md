# rolebot
A dead simple role management bot for Discord, writting with [Discord.js](https://discord.js.org/)

## Running it for yourself
Clone the repo and install dependencies.

```bash
git clone https://github.com/d4mr/rolebot.git
cd rolebot
npm install
```

Get your Discord client secret (create an app and get one from [here](https://discord.com/developers/applications) or learn more [here](https://discord.com/developers/docs/intro)) and set it as the CLIENT_SECRET environment variable. Alternatively, create a `.env` file like this:
```TXT:.env
CLIENT_SECRET=your_secret_goes_here
```
**Be carfeul!** *Do not commit your secret, or leak it anywhere publicly. This will grant anybody access to impersonate your bot.*

## Configuring your bot
Configuration options are found in [config.js](./config.js). This file should be pretty intuitive, I recommend adding the bot to a dummy server to test it out and understand the various configuration options. In case someone actually requires help in understanding these options, please open an issue, I would love to help you out.

## Adding the bot to your server
Create an ivite with this format `https://discord.com/oauth2/authorize?client_id={your_client_id_here}&scope=bot&permissions=268438608` but replace the `client_id` query string with your client ID. You can find yours [here](https://discord.com/developers/applications).

## Contributing
This bot would greatly benefit from better documentation of the configuration options.
