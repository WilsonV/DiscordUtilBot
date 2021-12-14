module.exports = {
  name: 'ping',
  adminOnly: true,
  description: 'returns a message when pinged.',
  execute(message){
    message.reply(`Look here, stop pinging me.`)
  }
}
