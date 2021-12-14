const axios = require('axios');

async function getUserCharacterStats(user, Discord){

  try {
    const { data } = await axios.get(`https://ow-api.com/v1/stats/pc/us/${user.battleTag.replace("#","-")}/heroes/${user.character}`)
    const newEmbed = Discord.MessageEmbed()
    .setTimestamp(Date.now())
    .setColor('#000000')
    .setTitle(`Stat Tracking For ${user.character.charAt(0).toUpperCase() + user.character.slice(1)}`)
    .setThumbnail(`https://d1u1mce87gyfbn.cloudfront.net/hero/${user.character}/hero-select-portrait.png`)
    const characterData = data.careerStats[user.character]
    if(characterData){

      newEmbed.addField('Avg. Deaths',`${user.deathsAvgPer10Min} -> ${characterData.average.deathsAvgPer10Min}`,true)
      newEmbed.addField('Avg. Elimination','12.45 -> 11.51',true)
    }else{
      user.channel.send(`Could not find any data on ${user.character}`)
      return
    }
  } catch (error) {
    console.log("Error Getting Character Stats")
  }

}
