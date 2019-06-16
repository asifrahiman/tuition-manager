<?php
	require '../utils/config.php';
	$sel = mysqli_query($con,"SELECT *,batches.Batch as Batch FROM `students` , `batches` where students.BatchId=batches.BatchId");
	$data = array();
	while ($row = mysqli_fetch_array($sel)) {
		$data[] = array("BatchId"=>$row['BatchId'],"StudentId"=>$row['StudentId'],"Name"=>$row['Name'],"Batch"=>$row['Batch']);
	}
	echo json_encode($data);
	mysqli_close($con);
?>
