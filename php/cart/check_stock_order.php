<?php
include("../general/conn.php");
include("../general/funs.php");

if(isset($_SESSION["userid"]))
{

$user_id =$_SESSION["userid"];

$sql = "SELECT p.pro_id ,stock FROM  cart c , products p WHERE user_id=$user_id AND p.pro_id = c.pro_id AND stock-quant < 0";
$data = getArray($sql);

echo json_encode($data);
}
mysqli_close($conn);

?>