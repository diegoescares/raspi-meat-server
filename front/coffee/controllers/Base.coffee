controllers.controller 'BaseCtrl', ($scope,$firebaseObject)->
	ref = new Firebase("https://raspberry-meat.firebaseio.com")

	$scope.status = $firebaseObject(ref)