module.exports = {
  name: "unmute",
  adminOnly: true,
  description: "Un-Mutes a member",
  execute(message){
    try{
      if(message.mentions.size<1)return message.reply("Un-Mute who? need to mention someone.")
    let mutedRole = message.guild.roles.cache.find( role => role.name === "Muted")

    let userToMute = message.mentions.users.first()
    if(userToMute){
      let muteTarget = message.guild.members.cache.get(userToMute.id)
      muteTarget.roles.remove(mutedRole)
      message.reply("User has been un-muted.")

    }else{
      message.reply("I can't un-mute that member")
    }


    }catch(error){
      console.log(error)
      message.reply("Error Attempt to un-mute failed.")
    }

  }
}
