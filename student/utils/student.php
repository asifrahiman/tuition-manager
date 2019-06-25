<?php
	require '../../utils/config.php';
	switch ($_GET['action']) {
		
		case "add":
					$BatchId=$_GET["BatchId"];
					$Name=$_GET["Name"];
					$Email=$_GET["Email"];
					$PhoneNo=$_GET["PhoneNo"];
					$Fees=$_GET["Fees"];
					if (!mysqli_query($con,"INSERT INTO students (BatchId , Name, Email, PhoneNo, Fees)VALUES ('$BatchId','$Name','$Email', '$PhoneNo', '$Fees')"))
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
						$data[] = array("BatchId"=>$row['BatchId'],"StudentId"=>$row['StudentId'],"Name"=>$row['Name'],"Batch"=>$row['Batch'], "Email"=>$row['Email'], "PhoneNo"=>$row['PhoneNo'], "Fees"=>$row['Fees']);
					}
					echo json_encode($data);
					break;
					
		case "update":
						$BatchId=$_GET["BatchId"];
						$Name=$_GET["Name"];
						$StudentId=$_GET["StudentId"];
						$Email=$_GET["Email"];
						$PhoneNo=$_GET["PhoneNo"];
						$Fees=$_GET["Fees"];
						if (!mysqli_query($con,"UPDATE `students` SET  `BatchId`='$BatchId',`Name`='$Name', `Email`='$Email', `PhoneNo`='$PhoneNo', `Fees`='$Fees' WHERE `StudentId`=$StudentId"))
						 {
							echo("Error description: " . mysqli_error($con));
							header("HTTP/1.0 500 Internal Server Error");
							die;
						 }
						echo "success";
						break;
						
		case "remove":
						$StudentId=$_GET["StudentId"];
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
						break;

		case "getStudentDetails":
						$StudentId=$_GET["StudentId"];
						$sel = mysqli_query($con,"SELECT * FROM `sessions` where `SessionId` in(Select `SessionId` from attendance where `StudentId` = $StudentId)" );
						$data1 = array();
						while ($row = mysqli_fetch_array($sel)) {
							$data1[] = array("SessionId"=>$row['SessionId'],"SessionName"=>$row['SessionName'],"Date"=>$row['Date']);
						}
						echo json_encode($data1);
						break;

		case "removeStudentAttendance":
					$SessionId=$_GET['SessionId'];
					$StudentId=$_GET['StudentId'];
					if (!mysqli_query($con,"DELETE FROM attendance where SessionId=$SessionId and `StudentId` = $StudentId"))
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
