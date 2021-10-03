# rolebot
A dead simple role management bot for Discord, writting with [Discord.js](https://discord.js.org/)

## Running it for yourself
Clone the repo and install dependencies.

```bash
git clone https://github.com/d4mr/rolebot.git
cd rolebot
npm install
```

Get your Discord client secret (create an app and get one from [here](https://discord.com/developers/applications) or learn more [here](https://discord.com/developers/docs/intro)) and set it as the `CLIENT_SECRET` environment variable. Alternatively, create a `.env` file like this:
```TXT:.env
CLIENT_SECRET=your_secret_goes_here
```
**Be carfeul!** *Do not commit your secret, or leak it anywhere publicly. This will grant anybody access to impersonate your bot.*
Run your bot with
```
npm start
```

## Configuring your bot

### roles-message

Configuration options for the message posted by the bot. Reacting to this message grants users with roles.

| Property | Description |
|--------  | --------------- |
| Title    | The text for the title of the embed |
| Color    | The color of the sidebar of the embed |
| Author   | The author of the embed |
| Description | The description of the embed |

### bot-admin-channel

Configuration options for the channel of the message posted by the bot for admins.

| Property | Description |
|--------  | --------------- |
| Category | The category of the channel |
| Name     | The name of the channel |

### bot-admin-role

The role for the admin who can use the bot.

### bot-message-channel

Configuration options for the the channel of message posted by the bot.

| Property | Description |
|--------  | --------------- |
| Category | The category of the channel |
| Name     | The name of the channel |

### Roles

Configuration for the roles

| Property | Description |
|--------  | --------------- |
| Channels | Properties |
| Category | The category of the channel |
| Name     | The name of the channel |
| Color    | The color of the sidebar of the embed |

## Adding the bot to your server
Create an invite link with this format 
```
https://discord.com/oauth2/authorize?client_id={your_client_id_here}&scope=bot&permissions=268438608
```
but replace the `client_id` query string with your client ID. You can find yours [here](https://discord.com/developers/applications).

## Contributing
This bot would greatly benefit from better documentation of the configuration options.
