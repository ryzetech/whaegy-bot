const { Client, Intents } = require('discord.js');
const { token } = require('./token.json');
// const { prefix } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
  console.log("Ready!");
});

client.on("messageCreate", message => {
  const channel = message.channel;

  channel.send({
    "embeds": [
      {
        "type": "rich",
        "title": `Lil WHÄGY - Social Media`,
        "description": `Do you want to hear more froim **Lil WHÄGY**? Check out his other presences!`,
        "color": 0x230633,
        "fields": [
          {
            "name": `Exclusive Songs`,
            "value": `[SoundCloud](https://soundcloud.com/user-411463626)`,
            "inline": true,
          },
          {
            "name": `Visualizers`,
            "value": `[YouTube](https://www.youtube.com/channel/UCNWst-KiCxNnpH3pdhPOINg)`,
            "inline": true,
          },
        ],
        "footer": {
          "text": `bot by https://ryzetech.live/ | service provided for free`,
        },
      },
    ],
  });
});

client.login(token);
