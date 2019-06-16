<?php
require '../utils/config.php';
$Batch=$_POST["Batch"];
if (!mysqli_query($con,"INSERT INTO batches (Batch)VALUES ('$Batch')"))
 {
	 echo("Error description: " . mysqli_error($con));
         header("HTTP/1.0 500 Internal Server Error");
         die;
 }
 $dbid=mysqli_insert_id($con);

 echo $dbid;
 mysqli_close($con);
?>
