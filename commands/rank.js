const axios = require('axios');

module.exports = {
  name: 'rank',
  adminOnly: false,
  description: 'Fetch overwatch rank of a battle tag.',
  async execute(message, args, Discord, client, userBattleTags) {
    //let userMentions = message.mentions.members
    let battleTag = "";
    let trackingInfos = {};

    //If an argument was passed, check it
    if(args[0]){
      if(!args[0].includes("#"))return message.reply("Please provide a valid battle tag in the format [name#tagNumber] (case sensitive)")
      battleTag = args[0].replace("#","-")
    }else{
      //If no argument was passed, check to see if they set a tag for themselves
      //console.log("Avalaible Tags are",userBattleTags)
      if(!userBattleTags[message.member.id]){
        return message.reply("You have not set a battle tag for your self yet, try the command ```setbattletag *Your Battle Tag*```")
      }else{
        battleTag = userBattleTags[message.member.id].battleTag.replace("#","-")
      }
    }
    try {
      const displaySRWithIcon =(icon,sr)=>{
        icon = icon.toLowerCase()
        let rank = "bronze";

        if(icon.includes("silver")) rank = "silver"
        if(icon.includes("gold")) rank = "gold"
        if(icon.includes("platinum")) rank = "platinum"
        if(icon.includes("diamond")) rank = "diamond"
        if(icon.includes("master")) rank = "master"
        if(icon.includes("grandmaster")) rank = "grandmaster"

        // if(sr>=4000)rank="grandmaster"
        // else if(sr>=3500)rank="master"
        // else if(sr>=3000)rank="diamond"
        // else if(sr>=2500)rank="platinum"
        // else if(sr>=2000)rank="gold"
        // else if(sr>=1500)rank="silver"

        const rankEmoji = client.emojis.cache.find(emoji => emoji.name === "rank_"+rank).toString()
        return rankEmoji+String(sr)
      }
      const { data } = await axios.get(`https://ow-api.com/v1/stats/pc/us/${battleTag}/profile`)
      console.log(data)

      const newEmbed = new Discord.MessageEmbed()
        .setTimestamp(Date.now())
        .setColor("#ff000")
        .setTitle(`${data.name.toUpperCase().split("#")[0]}' Rank`)
        .setDescription(`${data.name.toUpperCase().split("#")[0]}'s Overwatch Rank`)
        .setThumbnail(data.icon)

        if(data.ratings){
          for(const rating of data.ratings){
            if(rating.role === 'tank')trackingInfos.prevTank = rating.level
            if(rating.role === 'damage')trackingInfos.prevDamage = rating.level
            if(rating.role === 'support')trackingInfos.prevSupport = rating.level
            newEmbed.addField(rating.role.toUpperCase()+" SR",displaySRWithIcon(rating.rankIcon,rating.level), true)
          }
          trackingInfos.gamesPlayer = data.competitiveStats.games.played
          newEmbed.addField("Win Rate", String(data.competitiveStats.games.won)+"/"+String(data.competitiveStats.games.played), true)
        }

        if(data.private === true){
          newEmbed.addField("Private", "This profile is private")
        }

      message.channel.send({ embeds: [newEmbed] })
      return trackingInfos;
    } catch (error) {
      console.log(error)
      message.reply("Fail to get overwatch information.")
    }
  }
}
