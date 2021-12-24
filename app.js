const { Client, Intents } = require('discord.js');
const { token } = require('./token.json');
// const { prefix } = require('./config.json');

let counter = 0;
const inviteWhitelist = ["https://discord.gg/9pFgurh"];

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_INVITES] });

function checkInviteValidity() {
  // get all invites
  // if an invite is older than 1 hour and is used, delete it
  // log the number of invites deleted
  let deleted = 0;

  client.guilds.fetch("750404434953109616").fetchInvites().then((invites) => {
    invites.forEach((invite) => {
      if (invite.uses > 0 && invite.createdTimestamp < Date.now() - 3600000) {
        if (!inviteWhitelist.includes(invite.toString())) {
          invite.delete();
          deleted++;
        }
      }
    });
  });

  if (deleted > 0) {
    client.channels.cache.get("913155351912775731").send(`✅ Deleted ${deleted} invites in hourly clean!`);
  }
}

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('with ryze and mawk', { type: 'PLAYING' });
  client.channels.cache.get("913155351912775731").send(`✅ I'm logged in and now watching!`);

  checkInviteValidity();

  setInterval(checkInviteValidity, 3600000);
});

client.on("messageCreate", message => {
  if (message.author === client.user) return;

  const random = Math.floor(Math.random() * 100) + 1;
  // alternative Math.floor(Math.random() * (110 - 10 + 1)) + 10;

  if (counter < random) {
    counter++;
    return;
  }

  counter = 0;
  message.channel.send({
    "embeds": [
      {
        "type": "rich",
        "title": `Mawk Rose - Social Media`,
        "description": `Do you want to hear more from **Mawk Rose**? Check out his other presences!`,
        "color": 0x230633,
        "fields": [
          {
            "name": `Exclusive Songs`,
            "value": `[Spotify](https://open.spotify.com/artist/3nIb69gy5g6QARfRJco71b)`,
            "inline": true,
          },
          {
            "name": `All releases`,
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
