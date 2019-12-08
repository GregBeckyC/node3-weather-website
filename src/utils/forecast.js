
const request = require('request')

const forecast = (lat, long, callback) => {

    const url = 'https://api.darksky.net/forecast/d77e9ec0610ab0c62cf58e3e1fca2cc6/' + lat +','+ long

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            console.log(body.daily)
            callback(undefined, body.daily.data[0].summary + '  It is currently ' + body.currently.temperature + ' degrees out. The low temperature today is expected to be ' + body.daily.data[0].temperatureMin + ' with a high of ' + body.daily.data[0].temperatureMax  + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
            
        }
    })
}

module.exports = forecast 