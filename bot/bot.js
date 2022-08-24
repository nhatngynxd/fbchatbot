const builder = require('botbuilder')
var inMemoryStorage = new builder.MemoryBotStorage()
const mf = require('./utils/msgFactory')

const connector = new builder.ChatConnector({
  appId: null,
  appPassword: null,
})

var bot = new builder.UniversalBot(connector).set('storage', inMemoryStorage)

bot.dialog('/', [
  //
  // welcome & enter location
  //
  (session) => {
    builder.Prompts.text(session, mf.WELCOME)
    session.send('Hello')
  },
  (session, results, next) => {
    session.conversationData.location = results.response
    console.log('Location : ', session.conversationData.location)
    next()
  },

  //
  // day enter
  //
  (session) => {
    builder.Prompts.text(session, mf.DAYENTER)
  },
  (session, results, next) => {
    session.conversationData.day = results.response
    console.log('Day : ', session.conversationData.day)
    next()
  },

  //
  //  time enter && send back forecast
  //
  (session) => {
    builder.Prompts.text(session, mf.TIMEENTER)
  },
  async (session, results) => {
    session.conversationData.time = results.response
    console.log('Time : ', session.conversationData.time)

    let data = await getWeather(
      session.conversationData.location,
      session.conversationData.day,
      session.conversationData.time,
    )

    session.send(
      `Location : ${data.location} - ${data.country} \nLast updated : ${data.lastUpdate} \nTime : ${data.time} \nCondition : ${data.condition}\n` +
        mf.ENDCHAT,
    )
    session.endConversation()
  },
])

module.exports = {
  connector,
  bot,
}
