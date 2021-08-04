const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, "../templates/partials")

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Static directory to serve
app.use(express.static(publicDirPath))


/* app.get('/help', (request, response) => {
    response.send([{
        name: 'Naisarg',
        age: 23
    }, {
        name: 'Vijay',
        age: 59
    }])
}) */

/* app.get('/about', (request, response) => {
    response.send('<h1>About page</h1>')
}) */

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: "Naisarg"
    })
})

app.get('/about', (request, response) => {
    response.render('about', {
        name: "Naisarg",
        title: "About page"
    })
})

app.get('/help', (request, response) => {
    response.render('help', {
        msg: "Hey there",
        title: "Help page",
        name: "Naisarg"
    })
})


app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: "Please provide address"
        })
    } else {
        address = req.query.address
    }

    geocode(address, (error, {latitude, longitude, place_name} = {}) => {
        if (error) {
            return res.send({
                error
            })
        } else {
            forecast(latitude, longitude, (error, forecastdata) => {
                if (error) {
                    return res.send({
                        error
                    })
                } else {res.send({
                    forecastdata,
                    location: place_name,
                    address
                })}
            })
        }
    })
})

app.get('/help/*', (request, response) => {
    response.render('404', {
        msg: "Help article not found",
        title: "Help page",
        name: "Naisarg"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        msg: "Page not found",
        title: "",
        name: "Naisarg"
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000.')
})