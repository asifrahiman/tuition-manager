<?php
	require '../../utils/config.php';
	switch ($_GET['action']) {
		
		case "add":
					$BatchId=$_GET["BatchId"];
					$Name=$_GET["Name"];
					if (!mysqli_query($con,"INSERT INTO students (BatchId , Name)VALUES ('$BatchId','$Name')"))
					 {
						 echo("Error description: " . mysqli_error($con));
							 header("HTTP/1.0 500 Internal Server Error");
							 die;
					 }
					 $dbid=mysqli_insert_id($con);

					 echo $dbid;
					break;
					
		case "get":
					$sel = mysqli_query($con,"SELECT *,batches.Batch as Batch FROM `students` , `batches` where students.BatchId=batches.BatchId");
					$data = array();
					while ($row = mysqli_fetch_array($sel)) {
						$data[] = array("BatchId"=>$row['BatchId'],"StudentId"=>$row['StudentId'],"Name"=>$row['Name'],"Batch"=>$row['Batch']);
					}
					echo json_encode($data);
					break;
					
		case "update":
						$BatchId=$_GET["BatchId"];
						$Name=$_GET["Name"];
						$StudentId=$_GET["StudentId"];
						if (!mysqli_query($con,"UPDATE `students` SET  `BatchId`='$BatchId',`Name`='$Name' WHERE `StudentId`=$StudentId"))
						 {
							echo("Error description: " . mysqli_error($con));
							header("HTTP/1.0 500 Internal Server Error");
							die;
						 }
						echo "success";
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
					$StudentId=$_GET['StudentId'];
					if (!mysqli_query($con,"DELETE FROM `students` WHERE `StudentId` = $StudentId"))
					 {
						 echo("Error description: " . mysqli_error($con));
							 header("HTTP/1.0 500 Internal Server Error");
							 die;
					 }
					 else
					 {
						 echo("success");
					 }
	}
	mysqli_close($con);
?>
