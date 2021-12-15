const axios = require('axios');

async function getUserCharacterStats(user, Discord){

  //const trackingInfos = {};
  try {
    const { data } = await axios.get(`https://ow-api.com/v1/stats/pc/us/${user.battleTag.replace("#","-")}/heroes/${user.character}`)
    console.log(data)
    const newEmbed = new Discord.MessageEmbed()
    .setTimestamp(Date.now())
    .setColor('#000000')
    .setTitle(`Stat Tracking For ${user.character.charAt(0).toUpperCase() + user.character.slice(1)}`)
    .setThumbnail(`https://d1u1mce87gyfbn.cloudfront.net/hero/${user.character}/hero-select-portrait.png`)
    const characterData = data.competitiveStats.careerStats[user.character]
    if(characterData){

      newEmbed.addField('Avg. Deaths',`${user.deathsAvgPer10Min} -> ${characterData.average.deathsAvgPer10Min}`,true)
      newEmbed.addField('Avg. Elimination',`${user.eliminationsAvgPer10Min} -> ${characterData.average.eliminationsAvgPer10Min}`,true)
      newEmbed.addField('Elims Per Life',`${user.eliminationsPerLife} -> ${characterData.average.eliminationsPerLife}`,true)
      newEmbed.addField('Avg. Healing',`${user.healingDoneAvgPer10Min} -> ${characterData.average.healingDoneAvgPer10Min}`,true)
    newEmbed.addField('Avg. Damage',`${user.heroDamageDoneAvgPer10Min} -> ${characterData.average.heroDamageDoneAvgPer10Min}`,true)
    newEmbed.addField('Win Rate',`${characterData.game.gamesWon}/${characterData.game.gamesPlayed}`,true)

    user.deathsAvgPer10Min = characterData.average.deathsAvgPer10Min
    user.eliminationsAvgPer10Min = characterData.average.eliminationsAvgPer10Min
    user.eliminationsPerLife = characterData.average.eliminationsPerLife
    user.healingDoneAvgPer10Min = characterData.average.healingDoneAvgPer10Min
    user.heroDamageDoneAvgPer10Min = characterData.average.heroDamageDoneAvgPer10Min

    user.channel.send({ embeds: [newEmbed] })
    //return trackingInfos

    }else{
      user.channel.send(`Could not find any data on ${user.character}`)
      return
    }
  } catch (error) {
    console.log(error)
    console.log("Error Getting Character Stats")
  }

}

module.exports = getUserCharacterStats
