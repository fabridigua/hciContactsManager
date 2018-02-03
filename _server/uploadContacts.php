<?php
header('Access-Control-Allow-Origin: *');
$mysqli = new mysqli('localhost', 'hcicontactsmanager2017', '', 'my_hcicontactsmanager2017');

if ($mysqli->connect_errno) {
    printf("Connect failed: %s<br/>", $mysqli->connect_error);
    exit();
}
$session=$_REQUEST['sessionId'];
$device=$_REQUEST['device'];
$data=mysql_real_escape_string($_REQUEST['data']);

$query="INSERT INTO contacts (`session`, `device`, `contacts_list`) VALUES ('".$session."', '".$device."', '".$data."');";
$res=$mysqli->query($query) or die($mysqli->error);
$a=mysqli_fetch_assoc($res);

echo $a;

?>
