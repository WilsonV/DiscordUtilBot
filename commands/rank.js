const axios = require('axios');

module.exports = {
  name: 'rank',
  description: 'Embed',
  async execute(message, args, Discord, client) {
    let userMentions = message.mentions.members
    let BattleTag = "";
    if(!args[0]) return message.reply("Please provide a BattleTag [name#tag] (case sensitive)")
    if(userMentions.has(process.env.AKUMA_ID))BattleTag="Shock-12929"
    else if(userMentions.has(process.env.KEN_ID))BattleTag="SangWoo-11405"
    else if(userMentions.has(process.env.GOON_ID))BattleTag="GOON-11820"
    else if(userMentions.has(process.env.LERANDO_ID))BattleTag="Lerando-1988"
    else{
      if(!args[0].includes("#"))return message.reply("Please provide a valid battle tag in the format [name#tag] (case sensitive)")
      BattleTag = args[0].replace("#","-")
    }
    try {
      const displaySRWithIcon =(sr)=>{
        let rank = "bronze";

        if(sr>=4000)rank="grandmaster"
        else if(sr>=3500)rank="master"
        else if(sr>=3000)rank="diamond"
        else if(sr>=2500)rank="platinum"
        else if(sr>=2000)rank="gold"
        else if(sr>=1500)rank="silver"

        const rankEmoji = client.emojis.cache.find(emoji => emoji.name === "rank_"+rank).toString()
        return rankEmoji+String(sr)
      }
      const { data } = await axios.get(`https://ow-api.com/v1/stats/pc/us/${BattleTag}/profile`)
      //console.log(data)

      const newEmbed = new Discord.MessageEmbed()
        .setTimestamp(Date.now())
        .setColor("#ff000")
        .setTitle(`${data.name.toUpperCase().split("#")[0]}' Rank`)
        .setDescription(`${data.name.toUpperCase().split("#")[0]}'s Overwatch Rank`)
        .setThumbnail(data.icon)

        if(data.ratings){
          for(const rating of data.ratings){
            newEmbed.addField(rating.role.toUpperCase()+" SR", displaySRWithIcon(rating.level), true)
          }
          newEmbed.addField("Win Rate", String(data.competitiveStats.games.won)+"/"+String(data.competitiveStats.games.played), true)
        }

      message.channel.send({ embeds: [newEmbed] })
    } catch (error) {
      console.log(error)
      message.reply("Fail to get overwatch information.")
    }
  }
}
