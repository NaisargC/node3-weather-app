const request =  require('request')

const forecast = (lat, long, callback) => {
    const token = "f3020e3e735ec45d7dc17eb9a2ab8edb"
    const url = "http://api.weatherstack.com/current?access_key=" + token + "&query=" + lat + "," + long

    request({url, json: true},
        (error, { body } = {}) => {
            if (error) {
                callback("Unable to connect to internet", undefined)
            } else if (body.error) {
                callback("Unable to find location", undefined)
            }
            else {
                const data = body.current
                const temp = data.temperature
                const feels_like = data.feelslike
                const weather_info = data.weather_descriptions[0]
                
                callback(undefined, 
                    weather_info + ". It is "+ temp +"° out and feels like " + feels_like + "°")
            }
        })
}

module.exports = forecast 