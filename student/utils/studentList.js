var app = angular.module("studentlist", ['angularUtils.directives.dirPagination']); 
app.controller("myCtrl", function($scope, $filter,$http) {
	$scope.students = [];
	$scope.batches = [];
	$scope.editindex=-1;
	$http({
		method: 'GET',
		url: 'utils/student.php?action=get'
	}).then(function (success){
		var _len = success.data.length;
		var  post, i;
		for (i = 0; i < _len; i++) {
			//debugger
			post = success.data[i];
			$scope.students.push({'StudentId':post.StudentId,'BatchId':post.BatchId,'Batch':post.Batch,'Name':post.Name, 'Email':post.Email, 'PhoneNo':post.PhoneNo, 'Fees':post.Fees});
		}
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
	$scope.addItem = function () {
		var Batch;
		var Studentname = $scope.addname;
		var BatchId = $scope.addbatch;
		var Email = $scope.addemail;
		var PhoneNo = $scope.addphone;
		var Fees = $scope.addfees;
		if (!BatchId||!Studentname){alert("Please fill all the details");return;} 
		angular.forEach($scope.batches, function(item) {
			if( item.BatchId.indexOf(BatchId)==0){
				Batch=item.Batch;
			}
		});
		if($scope.editindex==-1){
			const newLocal = '&BatchId=' + BatchId + '&Name=' + Studentname + '&Email=' + Email + '&PhoneNo=' + PhoneNo + '&Fees=' + Fees;
			var dataString = newLocal;
			$http({
				method: 'GET',
				url: "utils/student.php?action=add"+dataString
			}).then(function(result){
				StudentId=parseInt(result.data);
				nitem={'BatchId':BatchId,'Name':Studentname,'Batch':Batch, 'StudentId':StudentId, 'Email':Email, 'PhoneNo':PhoneNo, 'Fees':Fees};
				$scope.students.push(nitem);
			},function (error){
				alert(error.data);
			});
		}
		else
		{
			var editindex=$scope.editindex;
			var dataString = '&BatchId='+ BatchId + '&Name='+ Studentname + '&StudentId='+ $scope.students[editindex].StudentId + '&Email='+ Email + '&PhoneNo='+ PhoneNo + '&Fees='+ Fees;
			
			$http({
				method: 'GET',
				url: "utils/student.php?action=update"+dataString
			}).then(function(result){
				$scope.students[editindex].Name=Studentname;
				$scope.students[editindex].BatchId=BatchId;
				$scope.students[editindex].Batch=Batch;
				$scope.students[editindex].Email=Email;
				$scope.students[editindex].PhoneNo=PhoneNo;
				$scope.students[editindex].Fees=Fees;

			}, function(error){
				alert(error.data);
			});
		}
		$scope.addbatch="";
		$scope.addname="";
		$scope.addemail="";
		$scope.addphone="";
		$scope.addfees="";
		$scope.editindex=-1;
	}
	$scope.removeItem = function (x) {
		var index = $scope.students.indexOf(x);
		if (index != -1) {
			var dataString = '&StudentId='+ $scope.students[index].StudentId;
			$http({
				method: 'GET',
				url: "utils/student.php?action=remove"+dataString
			}).then (function (result){
					$scope.students.splice(index, 1);
				},function (error){
				alert(error.data);
			});
		}
    }
	$scope.editItem = function (x) {
		var index = $scope.students.indexOf(x);
		$scope.addbatch=$scope.students[index].BatchId;
		$scope.addname=$scope.students[index].Name;
		$scope.addemail=$scope.students[index].Email;
		$scope.addphone=$scope.students[index].PhoneNo;
		$scope.addfees=$scope.students[index].Fees;
		$scope.editindex=index;
    }
	$scope.getStudentDetails = function (x) {

		$scope.studentSessions = [];
		$scope.StudentDetailId = x.StudentId;
		$scope.StudentDetailName = x.Name;
		$scope.StudentDetailEmail = x.Email;
		$scope.StudentDetailPhone = x.PhoneNo;
		$scope.StudentDetailFees = x.Fees;
		$scope.StudentDetailUnpaid="unpaid";

		var index = $scope.students.indexOf(x);
		var StudentId = $scope.students[index].StudentId;

		var dataString = '&StudentId='+ StudentId;
		$http({
			method: 'GET',
			url: "utils/student.php?action=getStudentDetails"+dataString
		}).then(function (success){
			var _len = success.data.length;
			var  post, i;
			for (i = 0; i < _len; i++) {
				//debugger
				post = success.data[i];
				$scope.studentSessions.push({'SessionId':post.SessionId, 'SessionName':post.SessionName,'Date':post.Date, 'StudentId':StudentId});
			}		
		},function (error){
			alert(error.data);
		});
	}

	$scope.removeStudentAttendance = function(x){
		var StudentId=x.StudentId;
		//console.log(x);
		var SessionId=x.SessionId;
		var dataString = '&SessionId='+ SessionId + '&StudentId='+ StudentId;
		$http({
			method: 'GET',
			url: 'utils/student.php?action=removeStudentAttendance'+ dataString
		}).then(function(result){
				var index = $scope.studentSessions.indexOf(x);
				$scope.studentSessions.splice(index, 1);
		},function (error){
			alert(error.data);
		});
	}
	
});	
