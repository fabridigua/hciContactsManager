<?php
header('Access-Control-Allow-Origin: *');
$mysqli = new mysqli('localhost', 'hcicontactsmanager2017', '', 'my_hcicontactsmanager2017');

if ($mysqli->connect_errno) {
    printf("Connect failed: %s<br/>", $mysqli->connect_error);
    exit();
}
$codex=$_REQUEST['device_session'];
$query="SELECT * FROM events WHERE device_session='".$codex."' LIMIT 1;";
$res=$mysqli->query($query) or die($mysqli->error);

$query2="DELETE FROM `my_hcicontactsmanager2017`.`events` WHERE `events`.`device_session` = '".$codex."' LIMIT 1;";
$res2=$mysqli->query($query2) or die($mysqli->error);

$a=mysqli_fetch_assoc($res);

echo(json_encode($a));


?>
