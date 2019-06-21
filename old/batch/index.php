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
<script src="utils/batchList.js"></script>

<body ng-app="batchlist" ng-controller="myCtrl">
	<div class="header1">
		<div class = "row" align = "center"><h2>Add a new Batch</h2></div>
		<div class = "container-fluid">
			<div class= "row">
				<div class = "col-sm-4"></div>
				<div class = "col-sm-2">
					<input type="text" style="width:100%" placeholder="Enter Name" ng-model="addbatch">
				</div>
				<div class = "col-sm-1">
					<span ng-click="addItem()" class="btn btn-block btn-success">Add</span>
				</div>
				<div class = "col-sm-5"></div>
			</div>
		</div>
		</br>
		<table style="background-color:#ffff;">
			<tr style="background-color:#595757;color:#ffff"><td>S.NO</td><td>Batch</td><td></td></tr>
			<tr ng-repeat="x in batches| orderBy:['Batch']" ng-class-even="'trcolour'" ><td>  {{$index+1}} </td><td>  {{x.Batch}} </td><td><span data-toggle="modal" data-target="#myModal" ng-click="getStudentDetails(x.BatchId)">view</span> | <span ng-click="editItem(x)">edit</span> | <span ng-click="removeItem(x)">clear</span></td></tr>
		</table>
	</div>
	<div id="myModal" class="modal fade" role="dialog">
		<div class="modal-dialog">
		<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title">Batch Details</h4>
				</div>
				<div class="modal-body">
					<table style="background-color:#ffff;">
						<tr style="background-color:#595757;color:#ffff"><td>S.Id</td><td>Name</td></tr>
						<tr ng-repeat="x in studentDetails| orderBy:['Name']" ng-class-even="'trcolour'" ><td>  {{x.StudentId}} </td><td>  {{x.Name}} </td></tr>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
