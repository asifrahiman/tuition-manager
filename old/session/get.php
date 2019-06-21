<?php
	require '../utils/config.php';
	$sel = mysqli_query($con,"SELECT * FROM `sessions`");
	$data = array();
	while ($row = mysqli_fetch_array($sel)) {
		$data[] = array("SessionId"=>$row['SessionId'],"Name"=>$row['Name'],"Date"=>$row['Date']);
	}
	echo json_encode($data);
	mysqli_close($con);
?>
