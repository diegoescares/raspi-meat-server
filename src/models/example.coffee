mongoose 	= require 'mongoose'
_ 			= require 'lodash'

Schema = mongoose.Schema

# Model schema
Example = new mongoose.Schema(
	label: 
		type: String
		required: true

	target:
		type: Schema.Types.ObjectId
)

# Hooks
Example.pre 'save', (next)-> next()

# Model methods
Example.methods.doSomething = ->
	console.log 'doing something'

# Static methods
Example.statics.getExampleByLabel = (label)->
	return @find({label:label})

module.exports = mongoose.model 'Example', Example