const axios = require('axios');


const displaySRWithIcon =(icon,sr,client)=>{
  icon = icon.toLowerCase()
  let rank = "bronze";

  if(icon.includes("silver")) rank = "silver"
  if(icon.includes("gold")) rank = "gold"
  if(icon.includes("platinum")) rank = "platinum"
  if(icon.includes("diamond")) rank = "diamond"
  if(icon.includes("master")) rank = "master"
  if(icon.includes("grandmaster")) rank = "grandmaster"

  const rankEmoji = client.emojis.cache.find(emoji => emoji.name === "rank_"+rank).toString()
  return rankEmoji+String(sr)
}

async function checkUserChanges(user, Discord, client){
  let tankDiff = false, damageDiff = false, supportDiff = false;
  if(user.track){
    console.log("looking up rank for "+user.battleTag)
    try{
    const { data } = await axios.get(`https://ow-api.com/v1/stats/pc/us/${user.battleTag.replace("#","-")}/profile`)
    if(data.ratings){
      for(const rating of data.ratings){
        if(rating.role === "tank"){
          if(user.prevTank.level != rating.level)
          tankDiff = true
        }
        if(rating.role === "damage"){
          if(user.prevDamage.level != rating.level)
          damageDiff = true
        }
        if(rating.role === "support"){
          if(user.prevSupport.level != rating.level)
          supportDiff = true
        }
      }
      if(!(tankDiff || damageDiff || supportDiff)){
        console.log(`No stat changes for ${user.battleTag}`)
        return
      }
    }else{
      user.track = false;
      return user.channel.send("Could not find any rank stats for this account, turning tracking off")
    }

    const newEmbed = new Discord.MessageEmbed()
      .setTimestamp(Date.now())
      .setColor("#ff000")
      .setTitle(`${data.name.toUpperCase().split("#")[0]}' Rank`)
      .setDescription(`Your ${tankDiff? "Tank SR,":''} ${damageDiff? "Damage SR,":''} ${supportDiff? "Support SR,":''} has changed after ${data.competitiveStats.games.played - user.gamesPlayed} game(s)`)
      .setThumbnail(data.icon)

      //Update games played value
      user.gamesPlayed = data.competitiveStats.games.played
      if(data.ratings){
        for(const rating of data.ratings){
          if(tankDiff && rating.role === "tank"){
            newEmbed.addField(rating.role.toUpperCase()+" SR",displaySRWithIcon(user.prevTank.rankIcon,user.prevTank.level, client)+" -> "+displaySRWithIcon(rating.rankIcon,rating.level, client), true)
            //update previous data for next check
            user.prevTank.level = rating.level
            user.prevTank.rankIcon = rating.rankIcon
          }
          if(damageDiff && rating.role === "damage"){
            newEmbed.addField(rating.role.toUpperCase()+" SR",displaySRWithIcon(user.prevDamage.rankIcon,user.prevDamage.level, client)+" -> "+displaySRWithIcon(rating.rankIcon,rating.level, client), true)
            //update previous data for next check
            user.prevDamage.level = rating.level
            user.prevDamage.rankIcon = rating.rankIcon
          }
          if(supportDiff && rating.role === "support"){
            newEmbed.addField(rating.role.toUpperCase()+" SR",displaySRWithIcon(user.prevSupport.rankIcon,user.prevSupport.level, client)+" -> "+displaySRWithIcon(rating.rankIcon,rating.level, client), true)
            //update previous data for next check
            user.prevSupport.level = rating.level
            user.prevSupport.rankIcon = rating.rankIcon
          }
        }
        newEmbed.addField("Win Rate", String(data.competitiveStats.games.won)+"/"+String(data.competitiveStats.games.played), true)
      }

      if(data.private === true){
        newEmbed.addField("Private", "This profile is private")
      }

      user.channel.send({ embeds: [newEmbed] })
    }catch(error){
      console.log(error)
      user.channel.send("Fail to get overwatch information from tracking.")
    }
  }
}

module.exports = checkUserChanges;
