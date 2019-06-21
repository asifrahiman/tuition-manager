<?php
require '../utils/config.php';
$Batch=$_POST["Batch"]; 
$BatchId=$_POST['BatchId'];
if (!mysqli_query($con,"UPDATE `batches` SET  `Batch`='$Batch' WHERE `BatchId`=$BatchId"))
 {
	echo("Error description: " . mysqli_error($con));
	header("HTTP/1.0 500 Internal Server Error");
	die;
 }
echo "success";
?>