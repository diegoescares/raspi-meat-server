require('dotenv').load({silent:true})
moment = require 'moment'
express = require 'express'
firebase = require './config/firebase'

# Create app instance.
app = express()

# Define Port & Environment
app.port = process.env.PORT or process.env.VMC_APP_PORT or 3000
env = process.env.NODE_ENV or "development"

# Config depending on environment
config = require "./config"
config.setEnvironment(app,env)

# Initialize routers
#if env == 'development'
require('./router-api')(app)
require('./router')(app)

lastTimestamp = Date.now()
firebase.on 'value', (snapshot)->
	current = snapshot.val()
	now = Date.now()
	duration =  now - lastTimestamp
	if duration > 5000
		console.log 'from', moment(lastTimestamp).format('YYYY-MM-D HH:mm:ss')
		console.log 'to', moment(now).format('YYYY-MM-D HH:mm:ss')
		console.log 'lasted', duration
		lastTimestamp = now

# Export application object
module.exports = app

