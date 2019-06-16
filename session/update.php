<?php
require '../utils/config.php';
$BatchId=$_POST["BatchId"];
$Name=$_POST["Name"];
$StudentId=$_POST["StudentId"];
if (!mysqli_query($con,"UPDATE `students` SET  `BatchId`='$BatchId',`Name`='$Name' WHERE `StudentId`=$StudentId"))
 {
	echo("Error description: " . mysqli_error($con));
	header("HTTP/1.0 500 Internal Server Error");
	die;
 }
echo "success";
?>