$(function(){	
	//Init modal
	$('#warning-modal, #success-modal').modal();
	$('#register-modal').modal(
		{
			dismissible:false,
			complete: function(){
				$("#register-email").val("");
				$("#register-password").val("");
			}
		}
	);

	$("#login-btn").bind('click', function(event){
		event.preventDefault();

		var email = $("#email").val();
		var password = $("#password").val();
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(function(data){
				window.location.href = "contact-overview.html";
			})
			.catch(function(error) {
				var errorCode     = error.code;
				var errorMessage  = error.message;
				$("#warning-message-content").modal('open');
		  		$("#warning-message-content").html(errorMessage);
			});
	})

	$("#open-register-modal-btn").bind('click', function(event) {
		$('#register-modal').modal('open');
	});

	$("#register-btn").bind('click', function(event) {
		event.preventDefault();

		$("#register-progress").show();
		var email = $("#register-email").val();
		var password = $("#register-password").val();

		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(function(data){
			// success handling
			$("#register-progress").hide();
			$('#success-modal').modal('open');
			$("#success-message-content").html("Register Success! You may proceed login.");

		})
		.catch(function(error) {
		  // error handling
		  var errorCode     = error.code;
		  var errorMessage  = error.message;
		  $("#register-progress").hide();
		  $("#warning-modal").modal('open');
		  $("#warning-message-content").html(errorMessage);
		});
	});
})