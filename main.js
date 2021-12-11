const Discord = require("discord.js");
const fs = require("fs");

const prefix = ".";

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

//User ID: KEN: 416485183236210689
//Tyler: 300296492122374145

client.on("messageCreate", (message) => {
  // if(message.author.id === '300296492122374145'){
  //   message.channel.send(`You're a beta Genji. Not even Masters. Yikes.`)
  // }

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (!message.member.permissions.has('ADMINISTRATOR')) {
    message.channel.send(`Who are you?\n${message.author}...\nYeah no, don't talk to me.`);
    return
  }
  //300296492122374145
  try {
    client.commands.get(command).execute(message, args, Discord, client)
  } catch (error) {
    message.reply("What command is that?")
  }

  // if (command === "ping") {
  //   client.commands.get("ping").execute(message);
  // }

  // if (command === "command") {
  //   client.commands.get("command").execute(message, args, Discord);
  // }

});

client.login("OTE5MDYzMTI3NDQ0ODE1OTUy.YbQWPA.0QaCXED8QEQFOV_YtaJ5mmHtU-k");
