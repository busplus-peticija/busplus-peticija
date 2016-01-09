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

	$scope.share = function() {
		url = window.location;
		title = document.title;
		
		winWidth = 520;
		winHeight = 350;

		var winTop = (screen.height / 2) - (winHeight / 2);
		var winLeft = (screen.width / 2) - (winWidth / 2);
		window.open('http://www.facebook.com/sharer.php?s=100&p[url]=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
	}

	$scope.dislikeCount = 0;
});

