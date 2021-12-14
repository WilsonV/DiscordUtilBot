const getRank = require('./rank')

module.exports = {
  name: "track",
  admminOnly: false,
  async execute(message, args, Discord, client, userBattleTags){

    if(!userBattleTags[message.member.id])return message.reply("Please set your battle tag to track. try ```setbattletag *Your BattleTag*```")
    if(userBattleTags[message.member.id].track)return message.reply("You battle tag progress is already being tracked.")

    userBattleTags[message.member.id].track = true;
    userBattleTags[message.member.id].channel = message.channel;
    const {gamesPlayed, prevTank, prevDamage, prevSupport} = await getRank.execute(message, args, Discord, client, userBattleTags)

    userBattleTags[message.member.id].gamesPlayed = gamesPlayed
    userBattleTags[message.member.id].prevTank = prevTank
    userBattleTags[message.member.id].prevDamage = prevDamage
    userBattleTags[message.member.id].prevSupport = prevSupport
    message.reply("Your battle tag is being tracked from this point")

  }

}
