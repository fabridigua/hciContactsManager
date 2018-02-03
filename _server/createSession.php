<?php
    header('Access-Control-Allow-Origin: *');
	$mysqli = new mysqli('localhost', 'hcicontactsmanager2017', '', 'my_hcicontactsmanager2017');

    if ($mysqli->connect_errno) {
        printf("Connect failed: %s<br/>", $mysqli->connect_error);
        exit();
    }
    $query="INSERT INTO `my_hcicontactsmanager2017`.`sessions` (`ID`, `device`, `info`) VALUES ('".$_GET['ID']."', '".$_GET['device']."', '".$_GET['info']."');";
$res=$mysqli->query($query) or die($mysqli->error);
	echo $res;
?>