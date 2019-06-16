<?php
	require '../utils/config.php';
	$sel = mysqli_query($con,"SELECT * FROM `batches`");
	$data = array();
	while ($row = mysqli_fetch_array($sel)) {
		$data[] = array("BatchId"=>$row['BatchId'],"Batch"=>$row['Batch']);
	}
	echo json_encode($data);
	mysqli_close($con);
?>
