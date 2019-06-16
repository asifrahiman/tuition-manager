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
		url: '../student/get.php'
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
		url: '../batch/get.php'
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
		url: 'get.php'
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
		if (!$scope.addbatch||!$scope.addname){alert("Please fill all the details");return;} 
		angular.forEach($scope.sessions, function(item) {
			if( item.BatchId.indexOf($scope.addbatch)==0){
				Batch=item.Batch;
			}
		});
		if($scope.editindex==-1){
			var dataString = 'BatchId='+ $scope.addbatch + '&Name='+ $scope.addname;
			nitem={'BatchId':$scope.addbatch,'Name':$scope.addname,'Batch':Batch};
			$scope.students.push(nitem);
			$.ajax({
				type: "POST",
				url: "add.php",
				data: dataString,
				cache: false,
				success: function(result){
					$scope.students[$scope.students.indexOf(nitem)].StudentId=parseInt(result);
				},
				error: function(request,status,errorThrown) {
					alert("error occured:"+errorThrown);
				}
			});
		}
		else
		{
			var dataString = 'BatchId='+ $scope.addbatch + '&Name='+ $scope.addname + '&StudentId='+ $scope.students[$scope.editindex].StudentId;
			$scope.students[$scope.editindex].Name=$scope.addname;
			$scope.students[$scope.editindex].BatchId=$scope.addbatch;
			$scope.students[$scope.editindex].Batch=Batch;
			$.ajax({
				type: "POST",
				url: "update.php",
				data: dataString,
				cache: false,
				success: function(result){
					
				},
				error: function(request,status,errorThrown) {
					alert("error occured:"+errorThrown);
				}
			});
		}
		$scope.addbatch="";
		$scope.addname="";
		$scope.editindex=-1;
	}
	$scope.removeItem = function (x) {
		var index = $scope.students.indexOf(x);
		if (index != -1) {
			var datastring = 'StudentId='+ $scope.students[index].StudentId;
			$scope.students.splice(index, 1);
			$.ajax({
				type: "POST",
				url: "remove.php",
				data: datastring,
				cache: false,
				success: function(result){
					
				},
				error: function(request,status,errorThrown) {
					alert("error occured");
				}
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