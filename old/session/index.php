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
	<script src="utils/sessionList.js"></script>
  <script src="../utils/dirPagination.js"></script>
</head>

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
