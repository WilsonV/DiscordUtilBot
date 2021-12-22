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
      if(user.battleTag === args[0]) return message.reply("This battle tag is already claimed.")
    }



    //check if user already has a tag set already, if so switch it
    if (userBattleTags[userId]) {
      //console.log("already exist battletag",userBattleTags[userId])
      message.reply(`Your battle tag has been switched from ${userBattleTags[userId].battleTag}, to ${args[0]}`)
    } else {
      message.reply(`Your battle tag is now ${args[0]}`)
    }

    userBattleTags[userId] = {
      channel: message.channel,
      battleTag: args[0],
      gamesPlayed: 0,
      prevTank: {level: 0, rankIcon: ""},
      prevDamage: {level: 0, rankIcon: ""},
      prevSupport: {level: 0, rankIcon: ""},
      character: '',
      track: false,
      deathsAvgPer10Min: 0,
      eliminationsAvgPer10Min: 0,
      eliminationsPerLife: 0,
      healingDoneAvgPer10Min: 0,
      heroDamageDoneAvgPer10Min: 0

    }
  }

}
