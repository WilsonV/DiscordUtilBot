module.exports = {
  name: "cmd",
  adminOnly: false,
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
      //Index 1 because index 0 is a the key (file name) of the command
      if(command[1].adminOnly){
        if(message.member.permissions.has('ADMINISTRATOR')){
          embedMsg.addField(command[1].name,command[1].description,false)
        }

      }else{
        embedMsg.addField(command[1].name,command[1].description,false)
      }

    }

    message.reply({embeds: [embedMsg]});
  }catch(error){
    console.log(error)
    message.reply("Error, could not get command list.")
  }
  }
}
