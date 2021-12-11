module.exports = {
  name: 'ping',
  descripting: 'returns a message when pinged.',
  execute(message){
    message.channel.send(`Look here ${message.author}, stop pinging me.`)
  }
}
