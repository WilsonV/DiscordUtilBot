module.exports = {
  name: "cmd",
  description: "Display available commands",
  execute(message,args,Discord,client){

    try{
    const embedMsg = new Discord.MessageEmbed()
    .setTimestamp(Date.now())
    .setTitle("Commands")
    .setDescription("List of all available commands")
    .setThumbnail("https://static.thenounproject.com/png/1266892-200.png")

    const iterator = client.commands.entries();

    for(const command of iterator){
      embedMsg.addField(command[1].name,command[1].description,false)
    }

    message.reply({embeds: [embedMsg]});
  }catch(error){
    console.log(error)
    message.reply("Error, could not get command list.")
  }
  }
}
