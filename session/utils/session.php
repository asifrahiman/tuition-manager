<?php
	require '../../utils/config.php';
	switch ($_GET['action']) {
		
		case "add":
			$BatchId=$_GET["BatchId"];
			$Name=$_GET["Name"];
			if (!mysqli_query($con,"INSERT INTO sessions (SessionId , Name)VALUES ('$BatchId','$Name')"))
			 {
				 echo("Error description: " . mysqli_error($con));
					 header("HTTP/1.0 500 Internal Server Error");
					 die;
			 }
			 $dbid=mysqli_insert_id($con);

			 echo $dbid;
			break;
		
		case "get":
			$sel = mysqli_query($con,"SELECT * FROM `sessions`");
			$data = array();
			while ($row = mysqli_fetch_array($sel)) {
				$data[] = array("SessionId"=>$row['SessionId'],"Name"=>$row['Name'],"Date"=>$row['Date']);
			}
			echo json_encode($data);
			break;
		
		case "update":
			$BatchId=$_GET["BatchId"];
			$Name=$_GET["Name"];
			$StudentId=$_GET["StudentId"];
			if (!mysqli_query($con,"UPDATE `sessions` SET  `BatchId`='$BatchId',`Name`='$Name' WHERE `StudentId`=$StudentId"))
			 {
				echo("Error description: " . mysqli_error($con));
				header("HTTP/1.0 500 Internal Server Error");
				die;
			 }
			echo "success";
			break;
		
		case "remove":
			$StudentId=$_GET['StudentId'];
			if (!mysqli_query($con,"DELETE FROM `sessions` WHERE `StudentId` = $StudentId"))
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
