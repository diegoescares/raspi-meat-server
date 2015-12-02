controllers.controller 'BaseCtrl', ($scope,$firebaseObject)->
	threshold = 180000
	ref = new Firebase("https://raspberry-meat.firebaseio.com")

	$scope.status = $firebaseObject(ref.child('status'))

	baseQuery = ref.child('session')
		.orderByChild('id')
	
	$scope.lastSessions = {}

	setLastSessionData = (snapshot)->
		result = snapshot.val()
		key = _.keys(result)[0]
		session = result[key]
		$scope.lastSessions[session.id] = session 
		$scope.$apply()
		
	baseQuery.equalTo('b_2')
		.limitToLast(1)
		.on 'value', setLastSessionData

	baseQuery.equalTo('b_1')
		.limitToLast(1)
		.on 'value', setLastSessionData
	

	$scope.showWarning = (id)->
		now = Date.now()
		session = $scope.lastSessions[id]
		return false if ! session
		if session.endTime?
			if session.duration > threshold && (now - session.endTime) < 30000 
				return true
		else
			if (now - session.startTime) > threshold
				return true

		return false