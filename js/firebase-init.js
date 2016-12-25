$(function(){
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyAaS_F_vExYFPxob9YUO1X5V1EUeyWWdwI",
		authDomain: "project-test-f2d10.firebaseapp.com",
		databaseURL: "https://project-test-f2d10.firebaseio.com",
		storageBucket: "project-test-f2d10.appspot.com",
		messagingSenderId: "115196049698"
	};
	firebase.initializeApp(config);
	var database = firebase.database();
})