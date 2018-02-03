<?php
header('Access-Control-Allow-Origin: *');
$mysqli = new mysqli('localhost', 'hcicontactsmanager2017', '', 'my_hcicontactsmanager2017');

if ($mysqli->connect_errno) {
    printf("Connect failed: %s<br/>", $mysqli->connect_error);
    exit();
}
$session=$_REQUEST['session'];
$device=$_REQUEST['device'];
$query="SELECT contacts_list FROM contacts WHERE session=".$session." and device='".$device."';";
$res=$mysqli->query($query) or die($mysqli->error);
$a=mysqli_fetch_assoc($res);
echo json_encode($a);


?>
