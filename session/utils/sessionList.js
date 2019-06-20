var app = angular.module("Sessionlist", []); 
app.controller("myCtrl", function($scope, $filter,$http) {
	$scope.students = [];
	$scope.sessions = [];
	$scope.batches = [];
	$scope.attendees = [];
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
	},function (error){
		alert(error);
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
		alert(error);
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
			$scope.sessions.push({'SessionId':post.SessionId,'Name':post.Name,'Date':post.Date});
		}
	},function (error){
		alert(error);
	});
	$scope.addItem = function () {
		var Batch;
		var BatchId = $scope.addbatch;
		let SessionName = $scope.addname;
		if (!BatchId||!SessionName){alert("Please fill all the details");return;} 
		angular.forEach($scope.sessions, function(item) {
			if( item.BatchId.indexOf(BatchId)==0){
				Batch=item.Batch;
			}
		});
		if($scope.editindex==-1){
			var dataString = '&BatchId='+ BatchId + '&Name='+ SessionName;
			$http({
				type: "GET",
				url: "util/session.php?action=add"+dataString
			}).then(function(result){
				BatchId=parseInt(result.data);
				nitem={'BatchId':BatchId,'Name':SessionName,'Batch':Batch, 'SessionId':SessionId};
				$scope.sessions.push(nitem);
			},function (error){
				alert(error);
			});
		}
		else
		{
			var editindex=$scope.editindex;
			var dataString = '&BatchId='+ BatchId + '&Name='+ SessionName + '&SessionId='+ $scope.sessions[editindex].SessionId;
			$http({
				type: "GET",
				url: "util/session.php?action=update"+dataString
			}).then(function(result){
				$scope.students[editindex].Name=SessionName;
				$scope.students[editindex].BatchId=$BatchId;
				$scope.students[editindex].Batch=Batch;
				},function (error){
					alert(error);
				});
		}
		$scope.addbatch="";
		$scope.addname="";
		$scope.editindex=-1;
	}
	$scope.removeItem = function (x) {
		var index = $scope.sessions.indexOf(x);
		if (index != -1) {
			var dataString = '&SessionId='+ $scope.sessions[index].SessionId;			
			$http({
				type: "GET",
				url: "util/session.php?action=remove"+dataString
			}).then(function(result){
				$scope.sessions.splice(index, 1);
			},
			function (error){
				alert(error);
			});
		}
    }
	$scope.editItem = function (x) {
		var index = $scope.students.indexOf(x);
		$scope.addbatch=$scope.students[index].BatchId;
		$scope.addname=$scope.students[index].Name;
		$scope.editindex=index;
    }
	$('#sessiondate').datepicker({
		autoclose: true,  
		format: "yyyy-mm-dd"
	}).datepicker('setDate', $scope.adddate).on('changeDate', function (ev) {$scope.adddate = $("#sessiondate").val();$scope.$apply();});
	$scope.IsVisible = false;
	$scope.ShowHide = function(){
		if($scope.IsVisible==true)
			$scope.IsVisible = false;
		else
			$scope.IsVisible = true;
	}
	$scope.addBatchAttendance = function(){
		angular.forEach($scope.students, function(item) {
			if( item.BatchId.indexOf($scope.addbatch)==0){
				$scope.attendees.push(item);
			}
		});
	}
	$scope.addToAttendees = function(x){
		$scope.attendees.push(x);
	}
	$scope.removeAttendance = function(x){
		var index = $scope.attendees.indexOf(x);
		$scope.attendees.splice(index, 1);
	}
});	