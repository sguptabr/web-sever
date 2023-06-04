const request = require('request')


const forecast = (param1, param2, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=79242345a3ad72276693869194483823&query='+param1+',%'+param2+'&units=m'

    request({url, json :true}, (error, { body}) => {
        if(error){
            callback('Unable to connect!',undefined)
        } else if(body.error){
            callback('Please enter valid cordinates', undefined)
        }else{
            const weather = body.current.weather_descriptions
            const temp = body.current.temperature
            callback(undefined,`${weather}. Its ${temp} Celcius outside`)
        }
    })
}

module.exports = forecast;