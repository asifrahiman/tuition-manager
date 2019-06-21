<?php
require '../utils/config.php';
$BatchId=$_POST['BatchId'];
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
 mysqli_close($con);
?>
