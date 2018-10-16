$(function(){
	// Initialize Firebase
	var config = {
		apiKey: "YOUR-API-KEY",
		authDomain: "YOUR-AUTHDOMAIN",
		databaseURL: "YOUR-DATABASE-URL",
		storageBucket: "YOUR-STORAGEBUCKET",
		messagingSenderId: "YOUR-MESSAGING-SENDER-ID"
	};
	firebase.initializeApp(config);
	var database = firebase.database();
})
