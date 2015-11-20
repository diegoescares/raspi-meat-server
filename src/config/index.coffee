express = require 'express'
mongoose = require 'mongoose'
session = require 'express-session'
flash = require 'connect-flash'
bodyParser = require 'body-parser'
compression = require 'compression'
MongoStore = require('connect-mongo')(session)
mpromise = require 'mongoose/node_modules/mpromise'
Promise = require 'bluebird'

#### Config file
# Sets application config parameters depending on `env` name
exports.setEnvironment = (app,env) ->
	console.log "Current environment: #{env}"
	switch(env)
		when "development"
			exports.DEBUG_LOG = true
			exports.DEBUG_WARN = true
			exports.DEBUG_ERROR = true
			exports.DEBUG_CLIENT = true

		when "staging"
			exports.DEBUG_LOG = true
			exports.DEBUG_WARN = true
			exports.DEBUG_ERROR = true
			exports.DEBUG_CLIENT = true

		when "production"
			exports.DEBUG_LOG = false
			exports.DEBUG_WARN = false
			exports.DEBUG_ERROR = true
			exports.DEBUG_CLIENT = false


	# MongoDB
	# Add catch method for compatibility with bluebird
	mpromise.prototype.catch = (onReject)->
		return this.then(undefined,onReject)

	db_config = process.env.MONGODB_URI || process.env.MONGOLAB_URI
	mongoose.connect db_config


	# Global Middleware
	app.use session(
		resave: false
		saveUninitialized: true
		name: "session"
		secret: "thisisasecret"
		key: "sid"
		store: new MongoStore({ mongooseConnection: mongoose.connection })
	)

	app.use flash()
	app.use bodyParser()
	app.use(compression())

	app.set('view engine', 'jade')
