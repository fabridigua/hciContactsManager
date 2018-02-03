<?php
header('Access-Control-Allow-Origin: *');
$mysqli = new mysqli('localhost', 'hcicontactsmanager2017', '', 'my_hcicontactsmanager2017');

if ($mysqli->connect_errno) {
    printf("Connect failed: %s<br/>", $mysqli->connect_error);
    exit();
}
$device_session=$_REQUEST['codex'];
$data=$_REQUEST['data'];

$query="INSERT INTO events (`device_session`, `data`) VALUES ('".$device_session."' , '".$data."');";
$res=$mysqli->query($query) or die($mysqli->error);
$a=mysqli_fetch_assoc($res);

echo $a;

?>
