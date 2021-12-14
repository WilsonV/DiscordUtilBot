module.exports = {
  name: "mute",
  adminOnly: true,
  description: "Mutes a member",
  execute(message){
    try{
      if(message.mentions.size<1)return message.reply("Mute who? need to mention someone.")
    let mutedRole = message.guild.roles.cache.find( role => role.name === "Muted")

    let userToMute = message.mentions.users.first()
    let serverOwner = message.guild.ownerId;
    if(userToMute.id === serverOwner)return message.reply("Can't mute the owner.")
    if(userToMute){
      let muteTarget = message.guild.members.cache.get(userToMute.id)
      muteTarget.roles.add(mutedRole)
      message.reply("User has been muted.")
    }else{
      message.reply("I can't mute that member")
    }


    }catch(error){
      console.log(error)
      message.reply("Error Attempt to mute failed.")
    }

  }
}
