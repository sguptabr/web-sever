// express is a function.
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(path.join(__dirname, '../public'))

const app = express()

//set up path variables for express config
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//set up hbs and view location
app.set("views", viewPath);
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//set up to render static dir's
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Sanjay'
    })
})

app.get('/about', (re, res) => {
    res.render('about',{
        title : 'About Me',
        name : 'Sanjay',
        robo : 'Chitti 2.0'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title : 'Help',
        name : 'Sanjay',
        phone : 7676915151
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title : "Help 404",
        name : 'Sanjay',
        errorMessage: 'Article not found!'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error
        })
    }

    geocode( req.query.address, (error, {lattitude, longitude, location}={}) => {
        if(error){
            return res.send({
                error 
            })
            
        }
        forecast(lattitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: 'Please enter valid data for lati & longi'
                })
            }
            res.send({
                forecast : forecastData,
                location : location,
                address : req.query.address
            })
        })
    })

    // res.send({
    //     forcaste : "Its rainy",
    //     location : "Bhadravathi",
    //     address : req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error : 'search must be required!'
        })
    }
    res.send({
        products : []
    })
})


app.get('*', (req, res) => {
    res.render('404',{
        title : '404',
        name : 'Sanjay',
        errorMessage : "Page not Found!"
    })
})

//Starting up the server on port 3000, message will not be displayed on web server.
app.listen( 3000, () => {
    console.log('Server is up and running on port 3000')
})