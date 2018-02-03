<?php
header('Access-Control-Allow-Origin: *');
$mysqli = new mysqli('localhost', 'hcicontactsmanager2017', '', 'my_hcicontactsmanager2017');

if ($mysqli->connect_errno) {
    printf("Connect failed: %s<br/>", $mysqli->connect_error);
    exit();
}
$session=$_REQUEST['session'];
$query="SELECT * FROM sessions WHERE ID=".$session.";";
$res=$mysqli->query($query) or die($mysqli->error);
$r=mysqli_fetch_assoc($res);

$sessionData->id = $r['ID'];
$sessionData->device = $r['device'];
$sessionData->info = $r['info'];

$sessionJSON = json_encode($sessionData);

echo $sessionJSON;

?>
