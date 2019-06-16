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
