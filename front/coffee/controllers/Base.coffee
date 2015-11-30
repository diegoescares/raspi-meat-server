controllers.controller 'BaseCtrl', ($scope,$firebaseObject)->
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
		console.log session.id,moment(session.startTime).format('HH:MM:ss')

	baseQuery.equalTo('b_2')
		.limitToLast(1)
		.on 'value', setLastSessionData

	baseQuery.equalTo('b_1')
		.limitToLast(1)
		.on 'value', setLastSessionData
	

	$scope.getElapsedTimeFor = (id)->
		elapsed = Date.now() - $scope.lastSessions[id].startTime
		console.log elapsed
		return elapsed