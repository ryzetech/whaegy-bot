const { Client, Intents } = require('discord.js');
const { token } = require('./token.json');
// const { prefix } = require('./config.json');

let counter = 0;

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once("ready", () => {
  console.log("Ready!");
});

client.on("messageCreate", message => {
  if (message.author === client.user) return;

  const random = Math.floor(Math.random() * 100) + 1;

  if (counter < random) {
    counter++;
    return;
  }

  message.channel.send({
    "embeds": [
      {
        "type": "rich",
        "title": `Mawk Rose - Social Media`,
        "description": `Do you want to hear more froim **Mawk Rose**? Check out his other presences!`,
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
