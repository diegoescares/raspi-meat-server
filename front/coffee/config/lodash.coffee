_.mixin
	objectDeepFlatten: (data,key)->
		data = _.clone(data)
		return _.reduce data, (result, item)->
			current = item
			currentChildren = item[key]
			#delete current[key]
			result.push current
			if currentChildren && currentChildren.length
				result = result.concat _.objectDeepFlatten(currentChildren,key)
			return result
		,[]

	search: (array,searchField,term)->
		term = term.toLowerCase()
		return _.filter array, (item)->
			return item[searchField].toLowerCase().indexOf(term) != -1

	deepFind: (data,searchTerms,returnChain = true,level = 0)->
		results = []
		found = _.find data, searchTerms
		if ! found
			_.each data, (item)->
				if item.children && _.isArray(item.children)
					childResults = _.deepFind(item.children,searchTerms,returnChain, level+1)
					if childResults
						if returnChain 
							results.push item
						results = results.concat childResults

		else 
			results.push found
		
		if results.length
			return results
		else return false