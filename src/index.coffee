require('dotenv').load({silent:true})
express = require 'express'
Tracker = require './modules/tracker'
firebase = require './config/firebase'
_ = require 'lodash'

# Create app instance.
app = express()

# Define Port & Environment
app.port = process.env.PORT or process.env.VMC_APP_PORT or 3000
env = process.env.NODE_ENV or "development"

# Config depending on environment
config = require "./config"
config.setEnvironment(app,env)

# Initialize routers
require('./router-api')(app)
require('./router')(app)

trackers = [
		new Tracker
			label: 'Baño Hombres'
			id: 'b_1'
	,
		new Tracker
			label: 'Baño Mujeres'
			id: 'b_2'
]

firebase.on 'value', (snapshot)->
	_.each snapshot.val(), (val,key)->
		tracker = _.find trackers, (tracker)->
			return tracker.data.id == key
		if tracker
			tracker.setState(val)

# Export application object
module.exports = app

