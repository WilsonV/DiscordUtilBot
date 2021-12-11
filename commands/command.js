module.exports = {
  name: 'command',
  description: 'Embed',
  execute(message, args, Discord){
    const newEmbed = new Discord.MessageEmbed()
    .setTimestamp(Date.now())
    .setColor("#304281")
    .setTitle("Ken's Rank")
    //.setURL('https://google.com/')
    .setDescription("EliteKen's Overwatch Rank")
    .addFields(
      {name: 'Current SR', value:'2560'},
    )
    // .setThumbnail('https://assets2.rockpapershotgun.com/overwatch-2-new-mccree.jpg/BROK/thumbnail/1600x800/format/jpg/quality/80/overwatch-2-new-mccree.jpg')
    .setThumbnail('https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/f8/Badge_4_Platinum.png/revision/latest/scale-to-width-down/128?cb=20160903204725')
    .setFooter(`Meh`)
    message.channel.send({embeds:[newEmbed]})
  }
}
