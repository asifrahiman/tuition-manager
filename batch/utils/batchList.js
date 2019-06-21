var app = angular.module("batchlist", []); 
app.controller("myCtrl", function($scope, $filter,$http) {
	$scope.batches = [];
	$scope.studentDetails = [];
	$scope.editindex=-1;
	$http({
		method: 'GET',
		url: 'utils/batch.php?action=get'
	}).then(function (success){
		var _len = success.data.length;
		var  post, i;
		for (i = 0; i < _len; i++) {
			//debugger
			post = success.data[i];
			$scope.batches.push({'Batch':post.Batch,'BatchId':post.BatchId});
		}
	},function (error){
		alert(error.data);
	});
	$scope.addItem = function () {
		var Batch=$scope.addbatch;
		if (!Batch){alert("Please fill all the details");return;} 
		if($scope.editindex==-1){
			var dataString = '&Batch='+ Batch;
			$http({
				method: 'GET',
				url: "utils/batch.php?action=add"+dataString
			}).then(function (result){
				BatchId=parseInt(result.data);
				nitem={'Batch':Batch,'BatchId':BatchId};
				$scope.batches.push(nitem);
			},function (error){
				alert(error.data);
			});
		}
		else
		{
			var editindex=$scope.editindex;
			var dataString = '&Batch='+ Batch + '&BatchId='+ $scope.batches[editindex].BatchId;
			$http({
				method: 'GET',
				url: "utils/batch.php?action=update"+dataString
			}).then(function (result){
				$scope.batches[editindex].Batch=Batch;
			},function (error){
				alert(error.data);
			});
		}
		$scope.addbatch="";
		$scope.editindex=-1;
	}
	$scope.removeItem = function (x) {
		var index = $scope.batches.indexOf(x);
		if (index != -1) {
			var dataString = '&BatchId='+ $scope.batches[index].BatchId;
			$http({
				method: 'GET',
				url: "utils/batch.php?action=remove"+dataString
			}).then(function (result){
				$scope.batches.splice(index, 1);
			},function (error){
				alert(error.data);
			});
		}
    }
	$scope.editItem = function (x) {
		var index = $scope.batches.indexOf(x);
		$scope.addbatch=$scope.batches[index].Batch;
		$scope.editindex=index;
    }
	$scope.getStudentDetails = function (BatchId) {
		$http({
			method: 'GET',
			url: '../student/utils/student.php?action=get'
		}).then(function (success){
			$scope.studentDetails=[];
			var _len = success.data.length;
			var  post, i;
			for (i = 0; i < _len; i++) {
				//debugger
				post = success.data[i];
				if(post.BatchId==BatchId)
					$scope.studentDetails.push({'Name':post.Name,'StudentId':post.StudentId});
			}
		},function (error){
			alert(error);
		});
	}
});	
