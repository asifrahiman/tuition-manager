var app = angular.module("studentlist", ['angularUtils.directives.dirPagination']); 
app.controller("myCtrl", function($scope, $filter,$http) {
	$scope.students = [];
	$scope.batches = [];
	$scope.editindex=-1;
	$scope.PaidSessions = 0.00;
	
	$http({
		method: 'GET',
		url: 'utils/student.php?action=get'
	}).then(function (success){
		var _len = success.data.length;
		var  post, i;
		for (i = 0; i < _len; i++) {
			//debugger
			post = success.data[i];
			$scope.students.push({'StudentId':post.StudentId,'BatchId':post.BatchId,'Batch':post.Batch,
			'Name':post.Name, 'Email':post.Email, 'PhoneNo':post.PhoneNo, 'Fees':post.Fees, 'PaidSessions':post.PaidSessions});
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
		var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		var phoneformat = /^\d{10}$/;
		if(!Email){Email="";}
		if(!PhoneNo){PhoneNo="";}
		if(Email!=""&&!Email.match(mailformat)){
			alert('Please enter a valid email address');
			return;
		}
		if(PhoneNo!=""&&!PhoneNo.match(phoneformat)){
			alert('Please enter a valid phone number');
			return;
		}
		if (!BatchId||!Studentname||!Fees){alert("Please fill all the details");return;} 
		angular.forEach($scope.batches, function(item) {
			if( item.BatchId.indexOf(BatchId)==0){
				Batch=item.Batch;
			}
		});
		if($scope.editindex==-1){
			var dataString = '&BatchId=' + BatchId + '&Name=' + Studentname + '&Email=' + Email + '&PhoneNo=' + PhoneNo + '&Fees=' + Fees;
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
			var dataString = '&BatchId='+ BatchId + '&Name='+ Studentname + '&StudentId='+ $scope.students[editindex].StudentId + 
			'&Email='+ Email + '&PhoneNo='+ PhoneNo + '&Fees='+ Fees;
			
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
		$scope.StudentDetailUnpaid=0;

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

			Classes = $scope.studentSessions.length;
			Paid = (x.PaidSessions);
			$scope.StudentDetailUnpaid = (Classes-Paid).toFixed(2);
			//console.log(Classes);
			
		},function (error){
			alert(error.data);
		});
	}

	$scope.payAmount = function(){
		StudentId=$scope.StudentDetailId;
		PaidSessions=$scope.PaidSessions;
		var dataString = '&StudentId='+ StudentId + '&PaidSessions=' + PaidSessions;
		$http({
			method: 'GET',
			url: "utils/student.php?action=pay"+dataString
		}).then(function (success){
			$scope.StudentDetailUnpaid=($scope.StudentDetailUnpaid-PaidSessions).toFixed(2);
			$scope.PaidAmount='';
			$scope.PaidSessions=0.00;
		},function (error){
			alert(error.data);
		});
	}

	$scope.viewPaidSession = function(){
		$scope.PaidSessions = ($scope.PaidAmount/$scope.StudentDetailFees).toFixed(2);
	}

	$scope.removeStudentAttendance = function(x){
		var StudentId=x.StudentId;
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
	