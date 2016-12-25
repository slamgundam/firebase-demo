$(function(){
	var get_highest_user_id = 0;
	var edit_user_id = 0;
	//Init modal
	$('#warning-modal').modal();
	$('#logout-modal').modal(
		{
			dismissible:false,
			complete: function(){
				window.location.href = "index.html";
			}
		}
	);

	$('#add-user-modal').modal(
		{
			complete: function(){
				edit_user_id = 0;
				$("#name").val("").blur();
				$("input[name='sex']").prop('checked', false);
				$("#mobile-phone").val("").blur();
				$("#company").val("").blur();
				$("#address").val("").blur();
			}
		}
	);

	//only monitor once to check user login or not
	var observer = function(user) {
	   var userLogin;
		if(user){
			userLogin = user;

		}else{
			userLogin = null;
			$("#logout-modal").modal('open');
			$("#logout-message-content").html("Unauthorized!");
		}
	   unsubscribe();
	};
	var unsubscribe = firebase.auth().onAuthStateChanged(observer);	

	//listing users data
	var listingUser = firebase.database().ref('users');
	listingUser.on('value', function(snapshot) {
		var html = '';
		var users_objects = snapshot.val();				
		if(users_objects)
		{
			var sort_by_user_id_desc = Object.keys(users_objects).sort(function(a, b){return users_objects[b].id-users_objects[a].id})
			get_highest_user_id = sort_by_user_id_desc[0];
		}else{
			get_highest_user_id = 0;
		}		

		var total_users = (users_objects)?Number(Object.keys(users_objects).length):0;
		if(total_users > 0){
			for(var key in users_objects)
			{
				if(users_objects.hasOwnProperty(key))
				{					
					var user = users_objects[key];
				    html += '<tr>';
				    html += '<td>'+user.id+'</td>';
					html += '<td>'+user.name+'</td>';
					html += '<td>'+user.sex+'</td>';
					html += '<td>'+user.phone+'</td>';
					html += '<td>'+user.company+'</td>';
					html += '<td>'+user.address+'</td>';
					html += '<td>';
					html += '<i class="material-icons edit-user-btn" user-id="'+user.id+'" title="Edit User">mode_edit</i><i class="material-icons delete-user-btn" user-id="'+user.id+'" title="Delete User">delete</i>';
					html += '</td>';
					html += '</tr>';			
				}
			}			
			$("#table-content").html(html);
		}else{
			$("#table-content").html('<tr><td colspan="7" style="text-align: center;">No Data to display</td></tr>');			
		}		
	});

	$("#open-add-user-modal").bind('click', function(event) {
		event.preventDefault();
		$("#change-save-edit-title-modal").text('Add');
		$("#add-user-btn").removeClass('add-edit-btn-hidden');
		$("#save-user-btn").addClass('add-edit-btn-hidden');
		$('#add-user-modal').modal('open');
	});


	$("#add-user-btn").bind('click', function(event) {
		event.preventDefault();
		$('#add-user-modal').modal('close');
		var new_user_id = Number(get_highest_user_id)+1;
		firebase.database().ref('users/'+new_user_id).set({			
			id: new_user_id,
			name: $("#name").val(),
			sex: $("input[name='sex']:checked").val(),
			phone: $("#mobile-phone").val(),
			company: $("#company").val(),
			address: $("#address").val()
		})
		.catch(function(error){
			console.error("Error on insert user data : ",error);
		});

	});
	$("#add-user-close-btn").bind('click', function(event) {
		event.preventDefault();

	});

	$("#logout-btn").bind('click', function(event) {
		event.preventDefault();
		firebase.auth().signOut().then(function() {
			console.log("User sign out!");
			window.location.href = "index.html";
		},
		function(error) {
			console.log("User sign out error!");
		});
	});


	$("#table-content").on('click', '.delete-user-btn', function(event){
		var user_id = $(this).attr("user-id");
		firebase.database().ref('/users/'+user_id).remove().then(function(){});
	});

	$("#table-content").on('click', '.edit-user-btn', function(event){
		var user_id = Number($(this).attr("user-id"));
		$("#change-save-edit-title-modal").text('Edit');		
		$("#add-user-btn").addClass('add-edit-btn-hidden');
		$("#save-user-btn").removeClass('add-edit-btn-hidden');
		$('#add-user-modal').modal('open');
		firebase.database().ref('/users/' + user_id).once('value').then(function(snapshot)
		{
			var user = snapshot.val();
			edit_user_id = user.id;
			$("#name").val(user.name).focus();
			$("input[name='sex'][value='"+user.sex+"']").prop('checked', true);
			$("#mobile-phone").val(user.phone).focus();
			$("#company").val(user.company).focus();
			$("#address").val(user.address).focus().blur();
		});
	});

	$("#save-user-btn").bind('click', function(event) {
		event.preventDefault();
		$('#add-user-modal').modal('close');
		firebase.database().ref('users/'+edit_user_id).set({
			id:edit_user_id,
			name: $("#name").val(),
			sex: $("input[name='sex']:checked").val(),
			phone: $("#mobile-phone").val(),
			company: $("#company").val(),
			address: $("#address").val()
		})
		.catch(function(error){
			console.error("Error on saving user data : ",error);
		});
	});
})