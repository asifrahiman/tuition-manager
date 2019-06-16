<?php
require '../utils/config.php';
$StudentId=$_POST['StudentId'];
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
 mysqli_close($con);
?>
