const Discord = require("discord.js")
const Client = new Discord.Client()

module.exports.Template = class Template {
  constructor(prefix, token, ownerId){
    this.prefix = prefix;
    this.token = token;
    this.ownerId = ownerId
  }
  bootup() {
    Client.once('ready', () => {
      console.log("Ready!")
    })
    Client.login(this.token)
  }
}
