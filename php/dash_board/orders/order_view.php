<?php

include("../../general/conn.php");
include("../../general/funs.php");

$order_id=$_POST['orderid'];



$sql = "SELECT order_id,o.user_id,datee,address,total_price,total_quant,order_status,CONCAT(fname, ' ' , lname) AS full_name,email FROM orders o , users u WHERE u.user_id=o.user_id AND order_id=$order_id ORDER BY   order_status , datee DESC  ";
$final = getArray($sql)[0];

$sql = "SELECT order_id,pro_id,pro_name,IFNULL(path,'default-image.jpg') as path,price,quant,total_price FROM order_items WHERE order_id=$order_id";
$data = getArray($sql);

$final['items']=$data;

echo json_encode($final);

mysqli_close($conn);

?>

