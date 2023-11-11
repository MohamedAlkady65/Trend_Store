<?php

include("../general/conn.php");
include("../general/funs.php");

$email = $_POST['email'];

$sql = "SELECT * from users WHERE email = '$email' ";
$data = getArray($sql);

echo count($data);

mysqli_close($conn);

?>