<?php
require '../utils/config.php';
$BatchId=$_POST["BatchId"];
$Name=$_POST["Name"];
if (!mysqli_query($con,"INSERT INTO students (BatchId , Name)VALUES ('$BatchId','$Name')"))
 {
	 echo("Error description: " . mysqli_error($con));
         header("HTTP/1.0 500 Internal Server Error");
         die;
 }
 $dbid=mysqli_insert_id($con);

 echo $dbid;
 mysqli_close($con);
?>
