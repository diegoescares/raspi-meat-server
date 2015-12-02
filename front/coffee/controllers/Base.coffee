controllers.controller 'BaseCtrl', ($scope,$firebaseObject,$interval,Time)->
	threshold = 180000
	ref = new Firebase("https://raspberry-meat.firebaseio.com")

	$scope.status = $firebaseObject(ref.child('status'))

	baseQuery = ref.child('session')
		.orderByChild('id')
	
	$scope.lastSessions = {}
	$scope.isOutOfSync = false

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
		now = Time.getCurrent()
		session = $scope.lastSessions[id]
		return false if ! session
		if session.endTime?
			if session.duration > threshold && (now - session.endTime) < 30000 
				return true
		else
			if (now - session.startTime) > threshold
				return true

		return false

	# Check for a heartbeat - if over 15 seconds difference the pi must have stopped responding
	$interval ->
		now = Time.getCurrent()
		difference =  now - $scope.status.heartbeat 
		if difference > 15000
			$scope.isOutOfSync = true
		else
			$scope.isOutOfSync = false
	, 1000