var app = angular.module("studentlist", []); 
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
	$scope.addItem = function () {
		var Batch;
		var Studentname = $scope.addname;
		var BatchId = $scope.addbatch;
		if (!BatchId||!Studentname){alert("Please fill all the details");return;} 
		angular.forEach($scope.batches, function(item) {
			if( item.BatchId.indexOf(BatchId)==0){
				Batch=item.Batch;
			}
		});
		if($scope.editindex==-1){
			var dataString = '&BatchId='+ BatchId + '&Name='+ Studentname;
			$http({
				method: 'GET',
				url: "utils/student.php?action=add"+dataString
			}).then(function(result){
				StudentId=parseInt(result.data);
				nitem={'BatchId':BatchId,'Name':Studentname,'Batch':Batch, 'StudentId':StudentId};
				$scope.students.push(nitem);
			},function (error){
				alert(error);
			});
		}
		else
		{
			var editindex=$scope.editindex;
			var dataString = '&BatchId='+ BatchId + '&Name='+ Studentname + '&StudentId='+ $scope.students[editindex].StudentId;
			
			$http({
				method: 'GET',
				url: "utils/student.php?action=update"+dataString
			}).then(function(result){
				$scope.students[editindex].Name=Studentname;
				$scope.students[editindex].BatchId=BatchId;
				$scope.students[editindex].Batch=Batch;
			}, function(error){
				alert(error);
			});
		}
		$scope.addbatch="";
		$scope.addname="";
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
});	
