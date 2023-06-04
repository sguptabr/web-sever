const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2d1cHRhYnIiLCJhIjoiY2xoeXp1eThlMDEwMjNudW4xY3czZDZiayJ9.2C6xdpTReScALMopmHwLHQ&limit=1'

    request( {url, json : true} , (error, {body}) => {
        if(error){
            callback('Unable to connect!',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location, Please try another search!',undefined)
        } else {
            const lattitude = body.features[0].center[0]
            const longitude = body.features[0].center[1]
            const location = body.features[0].place_name
            callback(undefined, {lattitude, longitude, location})
        }
    })
}

module.exports = geocode