const axios = require('axios')


async function getCharacterStat(message, character, user, Discord){

  if(!user)return message.reply("You have not set a battletag try ```setbattletag *your battle tag*```")

  try {
    const { data } = await axios.get(`https://ow-api.com/v1/stats/pc/us/${user.battleTag.replace("#","-")}/heroes/${character}`)
    //console.log(data)
    if(data.private)return message.reply("This account is private!")
    const newEmbed = new Discord.MessageEmbed()
    .setTimestamp(Date.now())
    .setColor('#000000')
    .setTitle(`Your stats for ${character.charAt(0).toUpperCase() + character.slice(1)}`)
    .setThumbnail(`https://d1u1mce87gyfbn.cloudfront.net/hero/${character}/hero-select-portrait.png`)


    const characterData = data.competitiveStats.careerStats[character]
    if(characterData){


      newEmbed.addField('Avg. Deaths',`${characterData.average.deathsAvgPer10Min}`,true)
      newEmbed.addField('Avg. Elimination',`${characterData.average.eliminationsAvgPer10Min}`,true)
      newEmbed.addField('Elims Per Life',`${characterData.average.eliminationsPerLife}`,true)
      newEmbed.addField('Avg. Healing',`${characterData.average.healingDoneAvgPer10Min||0}`,true)
      newEmbed.addField('Avg. Damage',`${characterData.average.heroDamageDoneAvgPer10Min}`,true)
      newEmbed.addField('Win Rate',`${characterData.game.gamesWon||0}/${characterData.game.gamesPlayed}`,true)

    message.reply({ embeds: [newEmbed] })
    //return trackingInfos

    }else{
      message.reply(`Could not find any data on ${character}`)
      return
    }

  } catch (error) {

    console.log(error)
    message.reply("Error: Couldn't get that info.")

  }

}


module.exports = getCharacterStat
