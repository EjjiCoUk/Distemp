const Discord = require("discord.js")
const Client = new Discord.Client()

module.exports.Template = class Template {
  constructor(prefix, token, ownerId){
    this.prefix = prefix;
    this.token = token;
    this.ownerId = ownerId
    this.Commands = Object.create(null)
  }
  addCommand(name) {
    this.Commands[name] = true
  }
  bootup() {
    Client.once('ready', () => {
      console.log("Ready!")
    })

    Client.on('message', message => {
      args=message.content.split(" ")
      cmd=args[0].split(this.prefix)[1]
      if(cmd=="test"){
        if(!this.Commands.test) return
        await message.channel.send("hey")
      }
    })

    Client.login(this.token)
  }
}
