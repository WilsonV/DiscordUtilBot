const Discord = require("discord.js");
const fs = require("fs");
require('dotenv').config()

const prefix = "!";

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("I am ready!");
});


client.on("messageCreate", (message) => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (!message.member.permissions.has('ADMINISTRATOR')) {
    message.reply(`Who are you?\n${message.author}...\nYeah no, don't talk to me.`);
    return
  }

  try {
    client.commands.get(command).execute(message, args, Discord, client)
  } catch (error) {
    message.reply("What command is that?")
  }

});

client.login(process.env.BOT_KEY);
