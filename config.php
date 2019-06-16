<?php
$server="localhost";
$username="id9483218_root";
$password="asifiscool";
$db="id9483218_tuitionmanager";
$con=mysqli_connect($server,$username,$password,$db);

// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();

         header("HTTP/1.0 500 Internal Server Error");
         die;
  }
?>