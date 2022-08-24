function formatMsg(msg, data) {
  const keys = Object.keys(data)

  for (let key of keys) {
    msg = msg.replace(`{${key}}`, `${data[key]}`)
  }
  return msg
}

module.exports = {
  formatMsg,
}
