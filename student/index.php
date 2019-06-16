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
var app = angular.module("studentlist", []); 
app.controller("myCtrl", function($scope, $filter,$http) {
	$scope.students = [];
	$scope.batches = [];
	$scope.editindex=-1;
	$http({
		method: 'GET',
		url: 'get.php'
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
	$scope.addItem = function () {
		var Batch;
		if (!$scope.addbatch||!$scope.addname){alert("Please fill all the details");return;} 
		angular.forEach($scope.batches, function(item) {
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
});	
</script>

<body ng-app="studentlist" ng-controller="myCtrl">
	<div class="header1">
		<div class = "row" align = "center"><h2>Add a Student</h2></div>
		<div class = "container-fluid">
			<div class= "row">
				<div class = "col-sm-3"></div>
				<div class = "col-sm-2">
					<input type="text" style="width:100%" placeholder="Enter Name" ng-model="addname">
				</div>
				<div class = "col-sm-2">
					<select ng-change="checkVal()" id = "TypeSelect" class="form-control" ng-model="addbatch">
					<option value="">Batch</option>
					<option ng-repeat="x in batches|orderBy:'Batch'" value="{{x.BatchId}}">{{x.Batch}}</option>
				</select>
				</div>
				<div class = "col-sm-1">
					<span ng-click="addItem()" class="btn btn-block btn-success">Add</span>
				</div>
				<div class = "col-sm-4"></div>
			</div>
		</div>
		</br>
		<table style="background-color:#ffff;">
			<tr style="background-color:#595757;color:#ffff"><td>Name</td><td>Batch</td><td></td></tr>
			<tr ng-repeat="x in students| orderBy:['Name']" ng-class-even="'trcolour'" ><td>  {{x.Name}} </td><td> {{x.Batch}} </td><td><span>view</span> | <span ng-click="editItem(x)">edit</span> | <span ng-click="removeItem(x)">clear</span></td></tr>
		</table>
	</div>
</body>
</html>
