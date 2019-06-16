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
<script src="utils/studentList.js"></script>

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
