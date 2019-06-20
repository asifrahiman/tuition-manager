<?php
	require '../../utils/config.php';
	switch ($_GET['action']) {
		case "add":
			$Batch=$_GET["Batch"];
			if (!mysqli_query($con,"INSERT INTO batches (Batch)VALUES ('$Batch')"))
			{
			echo("Error description: " . mysqli_error($con));
			header("HTTP/1.0 500 Internal Server Error");
			die;
			}
			$dbid=mysqli_insert_id($con);
			echo $dbid;
			break;
		
		case "get":
			$sel = mysqli_query($con,"SELECT * FROM `batches`");
			$data = array();
			while ($row = mysqli_fetch_array($sel)) {
				$data[] = array("BatchId"=>$row['BatchId'],"Batch"=>$row['Batch']);
			}
			echo json_encode($data);
			break;
		
		case "update":
			$Batch=$_GET["Batch"]; 
			$BatchId=$_GET['BatchId'];
			if (!mysqli_query($con,"UPDATE `batches` SET  `Batch`='$Batch' WHERE `BatchId`=$BatchId"))
			{
				echo("Error description: " . mysqli_error($con));
				header("HTTP/1.0 500 Internal Server Error");
				die;
			}
			else
			{
				echo("success");
			}
			break;
		
		case "remove":
			$BatchId=$_GET['BatchId'];
			if (!mysqli_query($con,"DELETE FROM `batches` WHERE `BatchId` = $BatchId"))
			{
				echo("Error description: " . mysqli_error($con));
				header("HTTP/1.0 500 Internal Server Error");
				die;
			}
			else
			{
				echo("success");
			}
			break;
		
		default:
			echo "An error occured";
			header("HTTP/1.0 500 Internal Server Error");
			die;
	}
	mysqli_close($con);
?>
