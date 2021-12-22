const getRank = require('./rank')
const getCharacterStats = require('../Util/userCharacterStats')
const availableCharacters = ['ana','ashe','baptiste','bastion','brigitte','cassidy','dva','doomfist','echo','genji','hanzo','junkrat','lucio','mei','mercy','moira','orisa','pharah','reaper','reinhardt','roadhog','sigma','soldier76','sombra','symmetra','torbjorn','tracer','widowmaker','winston','wreckingball','zarya','zenyatta']

module.exports = {
  name: "track",
  description: "Sets SR tracking to ON for your battle tag and notify you of changes.",
  admminOnly: false,
  async execute(message, args, Discord, client, userBattleTags){
    if(!userBattleTags[message.member.id])return message.reply("Please set your battle tag to track. try ```setbattletag *Your BattleTag*```")

    if(userBattleTags[message.member.id].track){ //If we were already tracking this user
      if(args[0]){ //if user asked to track a specific character

        if(args[0] === userBattleTags[message.member.id].character) //If we were already tracking that exact character
          return message.reply(`You battle tag progress is already being tracked for ${args[0]}.`)

      }else{ //If they asked to track now, but didn't ask for a specific character
        if(userBattleTags[message.member.id].character) //If we were tracking a character, track no character now
          userBattleTags[message.member.id].character = ''
      }
    }

    if(args[0]){
      if(!availableCharacters.includes(args[0]))return message.reply("That is not a valid character name to track.")
      userBattleTags[message.member.id].character = args[0]
    }

    userBattleTags[message.member.id].track = true;
    userBattleTags[message.member.id].channel = message.channel;
    const {gamesPlayed, prevTank, prevDamage, prevSupport} = await getRank.execute(message, '', Discord, client, userBattleTags)

    userBattleTags[message.member.id] = {
        ...userBattleTags[message.member.id],
        gamesPlayed,
        prevTank: prevTank,
        prevDamage,
        prevSupport,
        deathsAvgPer10Min: 0,
        eliminationsAvgPer10Min: 0,
        eliminationsPerLife: 0,
        healingDoneAvgPer10Min: 0,
        heroDamageDoneAvgPer10Min: 0
      }

    if(userBattleTags[message.member.id].character){

      await getCharacterStats(userBattleTags[message.member.id], Discord)
    }

    message.reply("Your battle tag is being tracked from this point")

  }

}
