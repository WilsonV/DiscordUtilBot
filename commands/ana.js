module.exports = {
  name:'ana',
  adminOnly: true,
  description: "Dummy data for ana stat track",
  execute(message, args, Discord, client, userBattleTags){

    const newEmbed = new Discord.MessageEmbed()
    .setTimestamp(Date.now())
    .setColor('#000000')
    .setTitle(`Stat Tracking Dummy Viewer`)
    .setThumbnail(`https://d1u1mce87gyfbn.cloudfront.net/hero/ana/hero-select-portrait.png`)
    .setDescription('Stat tracking for Ana')

    newEmbed.addField('Avg. Deaths','7.65 -> 7.86',true)
    newEmbed.addField('Avg. Elimination','```css\r\n12.45 -> 11.51```',true)
    newEmbed.addField('Elims Per Life','1.21 -> 1.46',true)
    newEmbed.addField('Avg. Healing','9268 -> 9487',true)
    newEmbed.addField('Avg. Damage','1984 -> 2145',true)
    newEmbed.addField('Win Rate','4/6',true)

    message.reply({embeds: [newEmbed]})

  }
}
