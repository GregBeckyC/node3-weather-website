const path = require('path')
const express = require('express') 
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectorypath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectorypath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App', 
        name: 'Greg Campbell'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Greg Campbell'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'helpful information',
        title: 'help',
        name: 'Greg Campbell'
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    debugger
   
    // geocode(req.query.address, (error, data) => {
   geocode(req.query.address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        // forecast(data.lat, data.long, (error, forecastData) => {
        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            } 

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) =>{
    if (!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})
    
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Greg Campbell',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Greg Campbell',
        message: "Page not found"
    })
})

app.listen(port, () => {
    console.log ('Server is up on port ' + port)
})

// app.listen(3000, () => {
//     console.log ('Server is up on port 3000')
// })