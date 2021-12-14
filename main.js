const Discord = require("discord.js");
const fs = require("fs");
const { TaskTimer } = require('tasktimer');

require('dotenv').config()

const prefix = "!";
const userBattleTags = {};

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", 'GUILD_VOICE_STATES'] });
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

///TASK TIMER
const rankTrackTimer = new TaskTimer(300000)


///


////ONCE ONLINE
client.once("ready", () => {
  console.log("I am ready!");
});


client.on("messageCreate", (message) => {

  if (!message.content.startsWith(prefix) || message.author.bot){
    if(Math.floor(Math.random()*100) === 1) message.reply("https://tenor.com/view/ash-cap-throw-catch-pokemon-gif-19138383")
    return;
  }
  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if(client.commands.get(command).adminOnly && !message.member.permissions.has('ADMINISTRATOR')) {
    message.reply("https://tenor.com/view/perms-no-perms-gif-19925400")
    //message.reply(`Who are you?\n${message.author}...\nYeah no, don't talk to me.`);
    return
  }

  try {
    client.commands.get(command).execute(message, args, Discord, client, userBattleTags)
  } catch (error) {
    message.reply("What command is that?")
  }

});

client.login(process.env.BOT_KEY);
