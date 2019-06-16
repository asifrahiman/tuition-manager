<?php
require '../../utils/config.php';

//if(add)
{	
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
}
 
 //else if(get)
 {
	 $sel = mysqli_query($con,"SELECT * FROM `batches`");
		$data = array();
		while ($row = mysqli_fetch_array($sel)) {
			$data[] = array("BatchId"=>$row['BatchId'],"Batch"=>$row['Batch']);
		}
		echo json_encode($data);
		mysqli_close($con);
 }

 
//else if(remove)
{
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
}

 
 //else if(update)
{
 $Batch=$_POST["Batch"]; 
$BatchId=$_POST['BatchId'];
if (!mysqli_query($con,"UPDATE `batches` SET  `Batch`='$Batch' WHERE `BatchId`=$BatchId"))
 {
	echo("Error description: " . mysqli_error($con));
	header("HTTP/1.0 500 Internal Server Error");
	die;
 }
echo "success";
}
?>
