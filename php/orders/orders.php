<?php

include("../general/conn.php");
include("../general/funs.php");


if(isset($_SESSION["userid"]))
{

$user_id =$_SESSION["userid"];

$sql = "SELECT * FROM orders WHERE user_id = $user_id ORDER BY   order_status , datee DESC  ";
$data = getArray($sql);


echo json_encode($data);
}
mysqli_close($conn);

?>