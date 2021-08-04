const request =  require('request')

const geocode = (address, callback) => {
    const token = "pk.eyJ1IjoibmFpc2FyZ2NoYXVoYW4iLCJhIjoiY2tydDA0cW1pMWM4bjJ0cGZtMG4zdDB6eCJ9.X26X-hDKMEZijlbidVbZFw"
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=" + token + "&limit=1"

    request({url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback("Unable to connect to internet", undefined)
        } else if (body.message) {
            callback("Unable to find location", undefined)
        }
        else if (body.features.length === 0 ) {
            callback("Unable to find location", undefined)
        } else {    
            const data = body.features[0]
            const longitude = data.center[0]
            const latitude = data.center[1]
            const place_name = data.place_name
            callback(undefined, {
                longitude,
                latitude,
                place_name
            })
        }
    })
}

module.exports = geocode