const getRank = require('./rank')
const getCharacterStats = require('../Util/userCharacterStats')
const availableCharacters = ['ana','ashe','baptiste','bastion','brigitte','cassidy','dva','doomfist','echo','genji','hanzo','junkrat','lucio','mei','mercy','moira','orisa','pharah','reaper','reinhardt','roadhog','sigma','soldier76','sombra','symmetra','torbjorn','tracer','widowmaker','winston','wreckingball','zarya','zenyatta']

module.exports = {
  name: "track",
  description: "Sets SR tracking to ON for your battle tag and notify you of changes.",
  admminOnly: false,
  async execute(message, args, Discord, client, userBattleTags){

    if(!userBattleTags[message.member.id])return message.reply("Please set your battle tag to track. try ```setbattletag *Your BattleTag*```")
    if(userBattleTags[message.member.id].track)return message.reply("You battle tag progress is already being tracked.")

    if(args[0]){
      if(!availableCharacters.includes(args[0]))return message.reply("That is not a valid character name to track.")
      userBattleTags[message.member.id].character = args[0]
    }

    userBattleTags[message.member.id].track = true;
    userBattleTags[message.member.id].channel = message.channel;
    const {gamesPlayed, prevTank, prevDamage, prevSupport} = await getRank.execute(message, '', Discord, client, userBattleTags)

    if(userBattleTags[message.member.id].character){
      // const { deathsAvgPer10Min, eliminationsAvgPer10Min, eliminationsPerLife, healingDoneAvgPer10Min, heroDamageDoneAvgPer10Min } =
      await getCharacterStats(userBattleTags[message.member.id], Discord)
    }

    userBattleTags[message.member.id] = {...userBattleTags[message.member.id], gamesPlayed, prevTank: {level: 2000, rankIcon: "gold"}, prevDamage, prevSupport}
    // userBattleTags[message.member.id].gamesPlayed = gamesPlayed
    // userBattleTags[message.member.id].prevTank = prevTank
    // userBattleTags[message.member.id].prevDamage = prevDamage
    // userBattleTags[message.member.id].prevSupport = prevSupport
    message.reply("Your battle tag is being tracked from this point")

  }

}
