module.exports = {
  name: "mute",
  description: "Mutes a member",
  execute(message, args){
    try{
      if(message.mentions.size<1)return message.reply("Mute who? need to mention someone.")
    let mutedRole = message.guild.roles.cache.find( role => role.name === "Muted")

    let userToMute = message.mentions.users.first()
    if(userToMute){
      let muteTarget = message.guild.members.cache.get(userToMute.id)
      if(!muteTarget.roles.cache.find(role => role.name ==="Owner")){
        muteTarget.roles.add(mutedRole)
        message.reply("User has been muted.")
      }else{
        message.reply("Can't mute the owner silly.")
      }
    }else{
      message.reply("I can't mute that member")
    }


    }catch(error){
      console.log(error)
      message.reply("Error Attempt to mute failed.")
    }

  }
}
