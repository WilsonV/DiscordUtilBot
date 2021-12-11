const axios = require('axios');

module.exports = {
  name: 'rank',
  description: 'Embed',
  async execute(message, args, Discord, client) {
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
      const { data } = await axios.get('https://ow-api.com/v1/stats/pc/us/Shock-12929/profile')
      //console.log(data)

      const newEmbed = new Discord.MessageEmbed()
        .setTimestamp(Date.now())
        .setColor("#ff000")
        .setTitle(`${data.name.toUpperCase()}' Rank`)
        //.setURL('https://google.com/')
        .setDescription(`${data.name.toUpperCase()}'s Overwatch Rank`)
        .addFields(
          { name: 'Tank SR', value: displaySRWithIcon(data.ratings[0].level), inline: true },
          { name: 'DPS SR', value: displaySRWithIcon(data.ratings[1].level), inline: true },
          { name: 'Support SR', value: displaySRWithIcon(data.ratings[2].level), inline: true },
          // { name: 'Open Queue SR', value: String(data.rating), inline: true },

          { name: 'Win Rate', value: `${String(data.competitiveStats.games.won)}/${String(data.competitiveStats.games.played)}`, inline: true },
          // { name: 'Gold Medals', value: String(data.competitiveStats.awards.medalsGold), inline: true },
        )
        // .setThumbnail('https://assets2.rockpapershotgun.com/overwatch-2-new-mccree.jpg/BROK/thumbnail/1600x800/format/jpg/quality/80/overwatch-2-new-mccree.jpg')
        .setThumbnail(data.icon)
      // .setFooter(`Meh`)
      message.channel.send({ embeds: [newEmbed] })
    } catch (error) {
      console.log(error)
      message.reply("Yeah...some error happened.")
    }
  }
}
