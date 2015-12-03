require('dotenv').load({silent:true})
express = require 'express'
_ = require 'lodash'

# Create app instance.
app = express()

# Define Port & Environment
app.port = process.env.PORT or process.env.VMC_APP_PORT or 3000
env = process.env.NODE_ENV or "development"
app.locals.gaId = process.env.GA_ID || false


# Config depending on environment
config = require "./config"
config.setEnvironment(app,env)

# Initialize routers
require('./router-api')(app)
require('./router')(app)

# Export application object
module.exports = app

