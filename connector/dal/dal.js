const { default: axios } = require('axios')
const url = 'http://localhost:3000'

let token

async function chattingAPI(message, userId) {
  return axios
    .post(
      'http://localhost:3001/api/messages',
      {
        text: message,
        textFormat: 'plain',
        type: 'message',
        channelId: 'facebook',
        from: {
          id: userId,
        },
        conversation: {
          id: userId,
        },
        serviceUrl: `${url}/messenger`,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .catch(async (err) => {
      if (err.response.data.status === 401) {
        let data = await authenticateWithBot()
        token = data.data.accessToken
        console.log('Token expired, new token : ', token)
        chattingAPI(message, userId)
      } else {
        console.log(err.message)
      }
    })
}

authenticateWithBot = async () => {
  return await axios
    .post(
      'http://localhost:3001/oauth/token',
      {
        grant_type: 'password',
        username: 'nhatnm',
        password: 'nhatnguyenxd',
      },
      {
        headers: {
          Authorization: `Basic YXBwbGljYXRpb246c2VjcmV0`,
          'Content-Type': `application/json`,
        },
      },
    )
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
  chattingAPI,
}
