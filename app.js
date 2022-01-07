const { Client, Intents, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { token } = require('./token.json');
// const { prefix } = require('./config.json');

let counter = 0;
let keksEmbed;
const inviteWhitelist = ["https://discord.gg/9pFgurh"];

const botcli = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_INVITES] });

const mawkEmbed = new MessageEmbed()
  .setTitle("Mawk - Social Media")
  .setDescription("Do you want to hear more from **Mawk**? Check out his other presences!")
  .setColor("#230633")
  .setThumbnail("https://i.ryzetech.live/mawkrose.jpg")
  .setImage("https://i.ryzetech.live/mawkrosebanner.jpg")
  .setFooter("bot by https://ryzetech.live/ | service provided for free");

const mawkEmbedButtons = new MessageActionRow()
  .addComponents(
    new MessageButton()
      .setStyle("LINK")
      .setLabel("Spotify")
      .setEmoji("929031160451977236")
      .setURL("https://open.spotify.com/artist/3nIb69gy5g6QARfRJco71b"),
    new MessageButton()
      .setStyle("LINK")
      .setLabel("SoundCloud")
      .setEmoji("929031467714117652")
      .setURL("https://soundcloud.com/user-411463626"),
    new MessageButton()
      .setStyle("LINK")
      .setLabel("YouTube")
      .setEmoji("929031649067425853")
      .setURL("https://www.youtube.com/channel/UCNWst-KiCxNnpH3pdhPOINg"),
  );

function checkInviteValidity() {
  // get all invites
  // if an invite is older than 1 hour and is used, delete it
  // log the number of invites deleted
  let deleted = 0;

  botcli.guilds.fetch("750404434953109616").fetchInvites().then((invites) => {
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
    botcli.channels.cache.get("913155351912775731").send(`✅ Deleted ${deleted} invites in hourly clean!`);
  }
}

botcli.once("ready", () => {
  console.log(`Logged in as ${botcli.user.tag}!`);
  botcli.user.setActivity('with ryze and mawk', { type: 'PLAYING' });
  botcli.channels.cache.get("913155351912775731").send(`✅ I'm logged in and now watching!`);

  const userKeksi = botcli.users.cache.get("250353791193448448");

  const chatchannel = botcli.channels.cache.get("750404434953109619");

  userKeksi.client.on("presenceUpdate", (oldPresence, newPresence) => {
    newPresence.activities.forEach((activity) => {
      if (activity.name === "Spotify" && activity.type === "LISTENING" && activity.details === "Can You Feel My Heart") {
        chatchannel.messages.fetch({ limit: 1 }).then((messages) => {
          const lastMessage = messages.first();
          if (lastMessage === keksEmbed) {
            return;
          }

          const emb = new MessageEmbed()
            .setImage("https://i.imgur.com/dTjXX9X.jpeg")
            .setFooter('This image has been sent because Cookie is listening to "Can You Feel My Heart" on Spotify.', userKeksi.displayAvatarURL());

          keksEmbed = chatchannel.send({ embeds: [emb] });
        });
      }
    });
  });

  // checkInviteValidity();

  // setInterval(checkInviteValidity, 3600000);
});

botcli.on("messageCreate", message => {
  if (message.author === botcli.user) return;
  if (message.content.startsWith("+mawk")) {
    counter = 0;
    message.channel.send({ embeds: [mawkEmbed], components: [mawkEmbedButtons] });
  }
  else {
    const random = Math.floor(Math.random() * 100) + 1;
    // alternative Math.floor(Math.random() * (110 - 10 + 1)) + 10;

    if (counter < random) {
      counter++;
      return;
    }

    counter = 0;

    message.channel.send({ "embeds": [mawkEmbed], components: [mawkEmbedButtons] });
  }
});

botcli.login(token);
