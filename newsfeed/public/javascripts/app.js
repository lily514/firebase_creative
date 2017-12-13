angular.module('newsfeed', ["firebase"])
.controller('MainCtrl', [
'$scope','$http', '$firebaseArray',
function($scope, $http, $firebaseArray) {
	var ref = firebase.database().ref().child("/posts");
	$scope.feed = $firebaseArray(ref);

	$scope.savePost = function savePost(){
		$scope.feed.$add({
			name: firebase.auth().currentUser.displayName,
			post: $scope.myPost});
	}
}]);


function signInWithGoogle(){
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
	  // ...
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});

}

function signOut(){
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}).catch(function(error) {
	  // An error happened.
	});
}
