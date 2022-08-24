const { default: axios } = require('axios')
var moment = require('moment')
const { connector } = require('../bot')

getWeather = async (location, day, time) => {
  day = moment().format('MM-DD-YYYY')

  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: {
      q: `${location}`,
      days: '1',
      lang: 'US',
      dt: `${day}`,
    },
    headers: {
      'X-RapidAPI-Key': '410c23bcf3msh4b98a277f9f6385p10f872jsna4e73ec0783e',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  }
  let country
  let lastUpdate
  let condition

  await axios
    .request(options)
    .then(function (response) {
      location = response.data.location.name
      country = response.data.location.country
      lastUpdate = response.data.current.last_updated
      condition =
        response.data.forecast.forecastday[0].hour[time].condition.text
    })
    .catch(function (error) {
      console.error(error)
    })
  return {
    location: location,
    country: country,
    lastUpdate: (lastUpdate = moment(lastUpdate, 'YYYY-MM-DD HH:mm')),
    time: (time = moment(time, 'HH').format('hh A')),
    condition: condition,
  }
}

listen = async (req, res, next) => {
  if (req) {
    connector.dispatch(req.body, res, next)
  }
}

module.exports = {
  listen,
  getWeather,
}
