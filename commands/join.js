module.exports = {
  name: "join",
  description: "Join a voice channel",
  execute(message, args, Discord, client) {
    let voiceChannel = message.member.voice.channel
    if (!voiceChannel) return message.reply("You are not connected to a voice channel")
    let permissions = voiceChannel.permissionsFor(message.client.user)
    if (!permissions.has('CONNECT')) return message.reply("You do not have permission to connet")
    if (!permissions.has('SPEAK')) return message.reply("Do not have permission to speak.")

    try {
      const {
        joinVoiceChannel,
        createAudioPlayer,
        createAudioResource
      } = require('@discordjs/voice');

      const connection = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });
      // const videoFinder = async (query) => {
      //   const videoResult = await ytSearch(query);

      //   return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
      //   const video = await videoFinder(args.join(' '));
      //   const stream = ytdl(video.url, {
      //     filter: "audioonly"
      //   });

      //   const player = createAudioPlayer();
      //   const resource = createAudioResource(stream);

      //   async function play() {
      //     await player.play(resource);
      //     connection.subscribe(player);


      //   }

      } catch (error) {
        console.log(error)
        message.reply("Error: Could not join channel")
      }
    }
}
