<?php

include("../general/conn.php");
include("../general/funs.php");

if(isset($_SESSION["userid"]))
{

$user_id =$_SESSION["userid"];

$sql = "SELECT IFNULL(SUM(total_price),0) as final_total_price , IFNULL(SUM(quant),0) as total_quant FROM cart WHERE user_id=$user_id";
$data = getArray($sql);

echo json_encode($data);
}
else{
    echo "[]";
}
mysqli_close($conn);

?>