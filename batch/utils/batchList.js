var app = angular.module("batchlist", []); 
app.controller("myCtrl", function($scope, $filter,$http) {
	$scope.batches = [];
	$scope.studentDetails = [];
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
			$scope.batches.push({'Batch':post.Batch,'BatchId':post.BatchId});
		}
	},function (error){
		alert(error);
	});
	$scope.addItem = function () {
		if (!$scope.addbatch){alert("Please fill all the details");return;} 
		if($scope.editindex==-1){
			var dataString = 'Batch='+ $scope.addbatch;
			nitem={'Batch':$scope.addbatch};
			$scope.batches.push(nitem);
			$.ajax({
				type: "POST",
				url: "add.php",
				data: dataString,
				cache: false,
				success: function(result){
					$scope.batches[$scope.batches.indexOf(nitem)].BatchId=parseInt(result);
				},
				error: function(request,status,errorThrown) {
					alert("error occured:"+errorThrown);
				}
			});
		}
		else
		{
			var dataString = 'Batch='+ $scope.addbatch + '&BatchId='+ $scope.batches[$scope.editindex].BatchId;
			$scope.batches[$scope.editindex].Batch=$scope.addbatch;
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
		$scope.editindex=-1;
	}
	$scope.removeItem = function (x) {
		var index = $scope.batches.indexOf(x);
		if (index != -1) {
			var datastring = 'BatchId='+ $scope.batches[index].BatchId;
			$scope.batches.splice(index, 1);
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
		var index = $scope.batches.indexOf(x);
		$scope.addbatch=$scope.batches[index].Batch;
		$scope.editindex=index;
    }
	$scope.getStudentDetails = function (BatchId) {
		$http({
			method: 'GET',
			url: '../student/get.php'
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
