var app = angular.module("Sessionlist", ['angularUtils.directives.dirPagination']); 
app.controller("myCtrl", function($scope, $filter,$http) {
	$scope.students = [];
	$scope.editattendees = [];
	$scope.editattendeesoriginal = [];
	$scope.editstudents = [];
	$scope.editstudentsoriginal = [];
	$scope.sessions = [];
	$scope.batches = [];
	$scope.attendees = [];
	$scope.sessionattendees = [];
	$scope.editindex=-1;
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10) {
		dd = '0'+dd;
	} 
	if(mm<10) {
		mm = '0'+mm;
	} 
	today = yyyy + '-' + mm + '-' + dd;
	$scope.adddate=today;
	$http({
		method: 'GET',
		url: '../student/utils/student.php?action=get'
	}).then(function (success){
		var _len = success.data.length;
		var  post, i;
		for (i = 0; i < _len; i++) {
			//debugger
			post = success.data[i];
			$scope.students.push({'StudentId':post.StudentId,'BatchId':post.BatchId,'Batch':post.Batch,'Name':post.Name});
		}
		$scope.editstudentsoriginal = angular.copy($scope.students);
	},function (error){
		alert(error.data);
	});
	$http({
		method: 'GET',
		url: '../batch/utils/batch.php?action=get'
	}).then(function (success){
		var _len = success.data.length;
		var  post, i;
		for (i = 0; i < _len; i++) {
			//debugger
			post = success.data[i];
			$scope.batches.push({'BatchId':post.BatchId,'Batch':post.Batch});
		}
	},function (error){
		alert(error.data);
	});
	$http({
		method: 'GET',
		url: 'utils/session.php?action=get'
	}).then(function (success){
		var _len = success.data.length;
		var  post, i;
		for (i = 0; i < _len; i++) {
			//debugger
			post = success.data[i];
			$scope.sessions.push({'SessionId':post.SessionId,'SessionName':post.SessionName,'Date':post.date});
		}
	},function (error){
		alert(error.data);
	});
	$scope.addSession = function () {
		var date = $scope.adddate;
		var SessionName = $scope.addname;
		if (!date||!SessionName||$scope.attendees.length==0){alert("Please fill all the details");return;} 
		var Attendeeslist = [];
		angular.forEach($scope.attendees, function(item) {
			Attendeeslist.push(parseInt(item.StudentId));	
		});
		var Attendeeslistjson=JSON.stringify(Attendeeslist);
		var dataString = '&date='+ date + '&SessionName='+ SessionName+ '&Attendees='+ Attendeeslistjson;
		$http({
			type: "GET",
			url: "utils/session.php?action=add"+dataString
		}).then(function(result){
			SessionId=parseInt(result.data);
			nitem={'SessionId':SessionId,'SessionName':SessionName,'Date':date};
			$scope.sessions.push(nitem);
			alert("Session added successfully");
		},function (error){
			alert(error.data);
		});
		$scope.addname="";
		angular.forEach($scope.attendees, function(item) {
			$scope.students.push(item);
		});
		$scope.attendees=[];
		$scope.adddate=today;
		$("#sessiondate").datepicker('setDate', today);
	}
	$scope.editSession = function () {
		var editindex=$scope.editindex;
		var date = $scope.editdate;
		var SessionName = $scope.editname;
		var SessionId = $scope.editSessionId;
		var addedAttendee = [];
		var removedAttendee = [];
		if (!date||!SessionName||$scope.editattendees.length==0){alert("Please fill all the details");return;} 
		angular.forEach($scope.editattendeesoriginal, function(originalattendee) {
			var found=false;
			angular.forEach($scope.editattendees, function(attendee) {
				if( originalattendee.StudentId==attendee.StudentId){
					found=true;
				}
			});	
			if(found==false){
				removedAttendee.push(parseInt(originalattendee.StudentId));
			}
		});
		angular.forEach($scope.editattendees, function(attendee) {
			var found=false;
			angular.forEach($scope.editattendeesoriginal, function(originalattendee) {
				if( originalattendee.StudentId==attendee.StudentId){
					found=true;
				}
			});	
			if(found==false){
				addedAttendee.push(parseInt(attendee.StudentId));
			}
		});
		var addedAttendeeslistjson=JSON.stringify(addedAttendee);
		var removedAttendeeslistjson=JSON.stringify(removedAttendee);
		var dataString = '&date='+ date + '&SessionName='+ SessionName + '&SessionId='+ SessionId+ '&addedAttendees='+ addedAttendeeslistjson+ '&removedAttendees='+ removedAttendeeslistjson;
		$http({
			type: "GET",
			url: "utils/session.php?action=update"+dataString
		}).then(function(result){
			$scope.sessions[editindex].SessionName=SessionName;
			$scope.sessions[editindex].Date=date;
			$scope.editattendeesoriginal = angular.copy($scope.editattendees);
			alert("Session edited successfully");
		},function (error){
			alert(error.data);
		});
	}
	$scope.removeItem = function (x) {
		var index = $scope.sessions.indexOf(x);
		if (index != -1) {
			var dataString = '&SessionId='+ $scope.sessions[index].SessionId;			
			$http({
				type: "GET",
				url: "utils/session.php?action=remove"+dataString
			}).then(function(result){
				$scope.sessions.splice(index, 1);
			},
			function (error){
				alert(error.data);
			});
		}
    }
	$scope.editItem = function (x) {
		var index = $scope.sessions.indexOf(x);
		$scope.editSessionId=$scope.sessions[index].SessionId;
		$scope.editname=$scope.sessions[index].SessionName;
		$scope.editdate=$scope.sessions[index].Date;
		$scope.editindex=index;
		$scope.IsVisible = false;
		$scope.editstudents = angular.copy($scope.editstudentsoriginal);
		var dataString = '&SessionId='+ $scope.editSessionId;
		$scope.editattendees=[];
		var editstudentstudentid=[];
		$http({
			method: 'GET',
			url: 'utils/session.php?action=getSessionAttendees'+ dataString
		}).then(function (success){
			var _len = success.data.length;
			var  post, i;
			for (i = 0; i < _len; i++) {
				//debugger
				post = success.data[i];
				editstudentstudentid.push(post.StudentId);
				angular.forEach(editstudentstudentid, function(studentid) {
					angular.forEach($scope.editstudents, function(item) {
						if( item.StudentId==studentid){
							$scope.editattendees.push(item);
						}
					});	
				});
				angular.forEach($scope.editattendees, function(item) {
					var index = $scope.editstudents.indexOf(item);
					console.log(index)
					if(index>-1)
					$scope.editstudents.splice(index, 1);
				});
			}
			$scope.editattendeesoriginal = angular.copy($scope.editattendees);
		},function (error){
			alert(error.data);
		});
		$("#editsessiondate").datepicker('setDate', $scope.editdate);
    }
	$('#sessiondate').datepicker({
		autoclose: true,  
		format: "yyyy-mm-dd"
	}).datepicker('setDate', $scope.adddate).on('changeDate', function (ev) {$scope.adddate = $("#sessiondate").val();});
	$('#editsessiondate').datepicker({
		autoclose: true,  
		format: "yyyy-mm-dd"
	}).datepicker('setDate', $scope.adddate).on('changeDate', function (ev) {$scope.editdate = $("#editsessiondate").val();});
	$scope.IsVisible = false;
	$scope.ShowHide = function(){
		if($scope.IsVisible==true)
			$scope.IsVisible = false;
		else
			$scope.IsVisible = true;
	}
	//to add attendance from batch dropdown
	$scope.addBatchAttendance = function(){
		angular.forEach($scope.students, function(item) {
			if($scope.attendees.indexOf(item)==-1)
				if( item.BatchId==$scope.addbatch){
						$scope.attendees.push(item);
					}
				
		});
		angular.forEach($scope.attendees, function(item) {
			var index = $scope.students.indexOf(item);
			console.log(index)
			if(index>-1)
			$scope.students.splice(index, 1);
		});
	}
	//to add attendance from other list.
	$scope.addToAttendees = function(x){
		var index = $scope.students.indexOf(x);
		$scope.students.splice(index, 1);
		$scope.attendees.push(x);
	}
	//to remove from attendance list
	$scope.removeAttendance = function(x){
		var index = $scope.attendees.indexOf(x);
		$scope.attendees.splice(index, 1);
		$scope.students.push(x);
		
	}
	//to get the details of a session
	$scope.getsession = function(x){
		$scope.sessionattendees=[];
		$scope.SessionDetailName=x.SessionName;
		$scope.SessionDetailDate=x.Date;
		var SessionId=x.SessionId;
		var dataString = '&SessionId='+ SessionId;
		$http({
			method: 'GET',
			url: 'utils/session.php?action=getSessionAttendees'+ dataString
		}).then(function (success){
			var _len = success.data.length;
			var  post, i;
			for (i = 0; i < _len; i++) {
				//debugger
				post = success.data[i];
				$scope.sessionattendees.push({'StudentId':post.StudentId,'SessionId':SessionId,'BatchId':post.BatchId,'Batch':post.Batch,'Name':post.Name});
			}
		},function (error){
			alert(error.data);
		});		
	}
	//to remove the attendance of one student from view list.
	$scope.removeStudentAttendance = function(x){
		var StudentId=x.StudentId;
		var SessionId=x.SessionId;
		var dataString = '&SessionId='+ SessionId+'&StudentId='+ StudentId;
		$http({
			method: 'GET',
			url: 'utils/session.php?action=removeStudentAttendance'+ dataString
		}).then(function(result){
				var index = $scope.sessionattendees.indexOf(x);
				$scope.sessionattendees.splice(index, 1);
		},function (error){
			alert(error.data);
		});
	}
	//to add attendance from batch dropdown for edit
	$scope.editBatchAttendance = function(){
		angular.forEach($scope.editstudents, function(item) {
			if($scope.editattendees.indexOf(item)==-1)
				if( item.BatchId==$scope.addbatch){
					$scope.editattendees.push(item);
				}
		});
		angular.forEach($scope.editattendees, function(item) {
			var index = $scope.editstudents.indexOf(item);
			console.log(index)
			if(index>-1)
			$scope.editstudents.splice(index, 1);
		});
	}
	//to add attendance from other list for edit
	$scope.editAddToAttendees = function(x){
		var index = $scope.editstudents.indexOf(x);
		$scope.editstudents.splice(index, 1);
		$scope.editattendees.push(x);
	}
	//to remove from attendance list  for edit
	$scope.editRemoveAttendance = function(x){
		var index = $scope.editattendees.indexOf(x);
		$scope.editattendees.splice(index, 1);
		$scope.editstudents.push(x);
		
	}
});	