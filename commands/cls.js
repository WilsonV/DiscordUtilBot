module.exports = {
  name:'cls',
  adminOnly: true,
  description: 'Clear messages !cls [number of messages]',
  async execute(message, args){
    if(!args[0]) return message.reply("Ok, but how many messages? try: .cls [number]\nOnly up to 99 Messages though.")
    if(isNaN(args[0])) return message.reply(`${args[0]}, is NOT a number. I need a number between 1 and 99`)
    if(args[0] < 1 || args[0] > 99 ) return message.reply(`Number should be between 1 and 99`)

    await message.channel.messages.fetch({limit: args[0]}).then(messages => message.channel.bulkDelete(messages))
  }
}
