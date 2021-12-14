module.exports = {
  name: "setbattletag",
  adminOnly: false,
  description: "Set your Blizzard Battle Tag for rank look ups. (Case Sensitive)",
  execute(message, args, Discord, client, userBattleTags) {
    if (!args[0]) return message.reply("Please provide the battle tag you wish to add to your account.")
    if (!args[0].includes("#")) return message.reply("That battle tag does not seem correct. use the format [name#tagNumber]")
    const userId = message.member.id

    //check to see if the tag is already being used
    //console.log("Values:",Object.values(userBattleTags))
    const currentUsersBattleTags = Object.values(userBattleTags)
    for(const user of currentUsersBattleTags){
      if(user.battletag === args[0]) return message.reply("This battle tag is already claimed.")
    }



    //check if user already has a tag set already, if so switch it
    if (userBattleTags[userId]) {
      message.reply(`Your battle tag has been switched from ${userBattleTags[userId].battletag}, to ${args[0]}`)
    } else {
      message.reply(`Your battle tag is now ${args[0]}`)
    }

    userBattleTags[userId] = {
      channel: message.channel,
      battleTag: args[0],
      gamesPlayed: 0,
      prevTank: 0,
      prevDamage: 0,
      prevSupport: 0,
      track: false,
    }
  }

}
