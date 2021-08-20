const Discord = require("discord.js")
const Client = new Discord.Client()

module.exports.Template = class Template {
  constructor(prefix, token, ownerId){
    this.prefix = prefix;
    this.token = token;
    this.ownerId = ownerId
    this.Commands = new Object
    this.ActiveCommands = Object.create(null)
    this.ActiveCommands.test = async (message, args) => {
      await message.channel.send("hey")
    }
    this.ActiveCommands.pong = async (message, args) => {
      await message.channel.send("ping")
    }
    this.ActiveCommands.useCommand = async (message, args) => {
      this.Commands[args[1]] = true
      if(!this.ActiveCommands[args[1]]) await message.channel.send(`The Command ${args[1]} Isn't Setup`)
    }
    this.ActiveCommands.unUseCommand = async (message, args) => {
      this.Commands[args[1]] = false
      if(!this.ActiveCommands[args[1]]) await message.channel.send(`The Command ${args[1]} Isn't Setup`)
    }
  }
  UseDefault(name) {
    this.Commands[name] = true
  }
  UnUseDefault(name) {
    this.Commands[name] = false
  }
  createCommand(name, cmd) {
    this.ActiveCommands[name] = cmd
  }
  bootup() {
    Client.once('ready', () => {
      console.log("Ready!")
    })

    Client.on('message', async (message) => {
      if(message.author.bot) return;
      var args=message.content.split(" ")
      var cmd=args[0].split(this.prefix)[1]
      if(!this.Commands[cmd]) return;
      if(!this.ActiveCommands[cmd]) await message.channel.send("This Command hasn't been setup yet")
      this.ActiveCommands[cmd](message, args)
    })

    Client.login(this.token)
  }
}
