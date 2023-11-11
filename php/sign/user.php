<?php

include("../general/conn.php");
include("../general/funs.php");

if(isset($_SESSION["userid"]))
{

$user_id =$_SESSION["userid"];

$sql = "SELECT user_id,fname,lname,email,phone FROM users WHERE user_id = $user_id ";
$data = getArray($sql);

echo json_encode($data);


}

mysqli_close($conn);


?>