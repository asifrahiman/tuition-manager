<?php
	require '../../utils/config.php';
	switch ($_GET['action']) {
		
		case "add":
			$date=$_GET["date"];
			$SessionName=$_GET["SessionName"];
			$Attendees=json_decode($_GET["Attendees"], true);
			if (!mysqli_query($con,"INSERT INTO sessions (SessionName , Date)VALUES ('$SessionName','$date')"))
			{
				echo("Error description: " . mysqli_error($con));
				header("HTTP/1.0 500 Internal Server Error");
				die;
			}
			$SessionId=mysqli_insert_id($con);
			foreach ($Attendees as $Attendee){
				mysqli_query($con,"INSERT INTO attendance (SessionId , StudentId)VALUES ('$SessionId','$Attendee')");
			} 
			echo $SessionId;
			break;
		
		case "get":
			$sel = mysqli_query($con,"SELECT * FROM `sessions`");
			$data = array();
			while ($row = mysqli_fetch_array($sel)) {
				$data[] = array("SessionId"=>$row['SessionId'],"SessionName"=>$row['SessionName'],"date"=>$row['Date']);
			}
			echo json_encode($data);
			break;
		
		case "update":
			$date=$_GET["date"];
			$SessionName=$_GET["SessionName"];
			$SessionId=$_GET["SessionId"];
			$addedAttendees=json_decode($_GET["addedAttendees"], true);
			$removedAttendees=json_decode($_GET["removedAttendees"], true);
			if (!mysqli_query($con,"UPDATE `sessions` SET  `Date`='$date',`SessionName`='$SessionName' WHERE `SessionId`=$SessionId"))
			 {
				echo("Error description: " . mysqli_error($con));
				header("HTTP/1.0 500 Internal Server Error");
				die;
			 }
			foreach ($addedAttendees as $Attendee){
				mysqli_query($con,"INSERT INTO attendance (SessionId , StudentId)VALUES ('$SessionId','$Attendee')");
			} 
			foreach ($removedAttendees as $Attendee){
				mysqli_query($con,"DELETE FROM attendance where SessionId=$SessionId and `StudentId` = $Attendee");
			} 
			break;
		
		case "remove":
			$SessionId=$_GET['SessionId'];
			if (!mysqli_multi_query($con,"DELETE FROM `sessions` WHERE `SessionId` = $SessionId;DELETE FROM attendance WHERE `SessionId` =  $SessionId"))
			{
				echo("Error description: " . mysqli_error($con));
				header("HTTP/1.0 500 Internal Server Error");
				die;
			 }
			echo "success";
			break;
		
		case "getSessionAttendees":
			$SessionId=$_GET['SessionId'];
			$sel = mysqli_query($con,"SELECT *,batches.Batch as Batch FROM `students` , `batches` where students.BatchId=batches.BatchId and `StudentId` in (select `StudentId` from attendance where SessionId=$SessionId) ");
			$data = array();
			while ($row = mysqli_fetch_array($sel)) {
				$data[] = array("BatchId"=>$row['BatchId'],"StudentId"=>$row['StudentId'],"Name"=>$row['Name'],"Batch"=>$row['Batch']);
			}
			echo json_encode($data);
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
