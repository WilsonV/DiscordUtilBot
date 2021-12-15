const checkUserChanges = require('./Util/userRankChanges')
const Discord = require("discord.js");
const fs = require("fs");
const { TaskTimer } = require('tasktimer');

require('dotenv').config()

const prefix = "!";
const userBattleTags = {};


const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

//Dummy value for testing tracking
// userBattleTags['416485183236210689'] = {
//   channel: client.channels.cache.get('919064511338655757'),
//   battleTag: 'SangWoo#11405',
//   gamesPlayed: 0,
//   prevTank: {level: 2119, rankIcon: "gold"},
//   prevDamage: {level: 0, rankIcon: ""},
//   prevSupport: {level: 0, rankIcon: ""},
//   track: true,
// }

///TASK TIMER
const rankTrackTimer = new TaskTimer(60000)

rankTrackTimer.on('tick', async () => {

  const users = Object.values(userBattleTags)

  for (const user of users) {
    await checkUserChanges(user, Discord, client)
  }
})

rankTrackTimer.start()

///

///Track User Function


////ONCE ONLINE
client.once("ready", () => {
  console.log("I am ready!");
});


client.on("messageCreate", (message) => {

  //Send a CAP meme reply to a random message as users chat.
  if (!message.author.bot && !message.content.startsWith(prefix)) {
    if (Math.floor(Math.random() * 100) === 1) message.reply("https://tenor.com/view/ash-cap-throw-catch-pokemon-gif-19138383")
  }

  if (!message.content.startsWith(prefix) || message.author.bot)return;
  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (client.commands.get(command).adminOnly && !message.member.permissions.has('ADMINISTRATOR')) {
    message.reply("https://tenor.com/view/perms-no-perms-gif-19925400")
    //message.reply(`Who are you?\n${message.author}...\nYeah no, don't talk to me.`);
    return
  }

  try {
    client.commands.get(command).execute(message, args, Discord, client, userBattleTags)
  } catch (error) {
    console.log(error)
    message.reply("What command is that?")
  }

});

client.login(process.env.BOT_KEY);
