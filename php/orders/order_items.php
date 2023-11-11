<?php

include("../general/conn.php");
include("../general/funs.php");

$order_id=$_POST['order_id'];


$sql = "SELECT * FROM orders WHERE order_id = $order_id";
$final = getArray($sql)[0];

$sql = "SELECT order_id,pro_id,pro_name,IFNULL(path,'default-image.jpg') as path,price,quant,total_price FROM order_items WHERE order_id=$order_id";
$data = getArray($sql);

$final['items']=$data;

echo json_encode($final);

mysqli_close($conn);

?>

