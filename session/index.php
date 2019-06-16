<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="Attendance Recorder">
	<meta name="author" content="Asif Abdul Rahiman">
	<title>Attendance Recorder</title>
	<link rel="shortcut icon" href="../utils/favicon.ico" type="image/x-icon">
	<link rel="icon" href="../utils/favicon.ico" type="image/x-icon">
	<link rel="stylesheet" type="text/css" href="../utils/mystyle.css">
	<link href="../utils/bootstrap.min.css" rel="stylesheet">  
	<link href="../utils/bootstrap-datepicker.css" rel="stylesheet">  
	<script src="../utils/jquery.js"></script>  
	<script src="../utils/bootstrap.min.js"></script>  
	<script src="../utils/bootstrap-datepicker.js"></script> 
	<script src="../utils/angular.min.js"></script>
</head>
<script>
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
</script>

<body ng-app="Sessionlist" ng-controller="myCtrl">
	<div class="header1">
		<div class = "row" align = "center">
			<div class = "col-sm-10"></div>
			<div class = "col-sm-2">
				<span class="btn btn-block btn-success" data-toggle="modal" data-target="#AddAttendance">Add Session</span>
			</div>
		</div>
		</br>
		<table style="background-color:#ffff;">
			<tr style="background-color:#595757;color:#ffff"><td>Name</td><td>Date</td><td></td></tr>
			<tr ng-repeat="x in sessions| orderBy:['Name']" ng-class-even="'trcolour'" ><td>  {{x.Name}} </td><td> {{x.Date}} </td><td><span>view</span> | <span ng-click="editItem(x)">edit</span> | <span ng-click="removeItem(x)">clear</span></td></tr>
		</table>
	</div>
	<div id="AddAttendance" class="modal fade" role="dialog">
		<div class="modal-dialog" style="width: 100%;">
		<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title">Add Session</h4>
				</div>
				
				<div class="modal-body">
					<div>
						<input type="text" placeholder="Session Name" ng-model="addname">
						<input type="text" id="sessiondate" ng-model="adddate" class="dateBtn styled-select semi-square" placeholder="Select date"/>
					</div>
					<div>
						<table style="background-color:#ffff;">
							<tr style="background-color:#595757;color:#ffff"><td>S.Id</td><td>Name</td><td></td></tr>
							<tr ng-repeat="x in attendees| orderBy:['Name'] | filter : studentFilter" ng-class-even="'trcolour'" ><td>  {{x.StudentId}} </td><td>  {{x.Name}} </td><td><span ng-click="removeAttendance(x)">Remove</span></td></tr>
						</table>
					</div>
					<div>
						<select class="form-control" ng-model="addbatch" style="width: 20%;">
						<option value="">Batch</option>
						<option ng-repeat="x in batches|orderBy:'Batch'" value="{{x.BatchId}}">{{x.Batch}}</option>
						</Select>
						<button type="button" ng-click="addBatchAttendance()" class="btn btn-default">Add Attendance</button>
					</div>
					<div>
						<span ng-click="ShowHide()" class="btn btn-success">Add Others</span>
						<div ng-show = "IsVisible">
							<input type="text" placeholder="Filter" ng-model="studentFilter">
							<table style="background-color:#ffff;">
								<tr style="background-color:#595757;color:#ffff"><td>S.Id</td><td>Name</td><td></td></tr>
								<tr ng-repeat="x in students| orderBy:['Name'] | filter : studentFilter" ng-class-even="'trcolour'" ><td>  {{x.StudentId}} </td><td>  {{x.Name}} </td><td><span ng-click="addToAttendees(x)">Add To List</span></td></tr>
							</table>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					
					<span ng-click="addItem()" class="btn btn-success">Add Session</span>
					<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
