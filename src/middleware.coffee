module.exports = 
	locals: (req,res,next)->
		res.locals.baseTime = Date.now()
		next()