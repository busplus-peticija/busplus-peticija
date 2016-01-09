var firebaseURL = "https://nemanjan00-dislike.firebaseio.com/";
var count;

angular.module("org.nemanjan00.dislike", ["firebase"])
.controller("dislike", function($scope, $firebaseObject, $firebaseAuth) {
	var ref = new Firebase(firebaseURL);

	var user = ref.getAuth();

	$scope.dislikesContent = $firebaseObject(ref.child('votes'));

	$scope.dislikesContent.$watch(function() {
		count = 0;

		angular.forEach($scope.dislikesContent, function(value, key) {
			count++;
		});

		$scope.dislikeCount = count;
	});

	if(!user){
		var auth = $firebaseAuth(ref);

		auth.$authAnonymously().then(function(authData) {
			user = authData;
			console.log("Logged in as:", authData.uid);
		}).catch(function(error) {
			console.error("Authentication failed:", error);
		});
	}

	$scope.dislike = function(){
		ref.child("votes").child(user.uid).set(true);
	}

	$scope.dislikeCount = 0;
});

