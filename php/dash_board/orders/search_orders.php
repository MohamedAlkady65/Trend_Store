<?php

include("../../general/conn.php");
include("../../general/funs.php");

$searchVal = $_GET['searchVal'];

$sql = "SELECT order_id,o.user_id,datee,address,total_price,total_quant,order_status,CONCAT(fname, ' ' , lname) AS full_name,email FROM orders o , users u WHERE u.user_id=o.user_id AND ( order_id LIKE '%$searchVal%' OR CONCAT(fname, ' ' , lname) LIKE '%$searchVal%') ORDER BY   order_status , datee DESC  ";
$data = getArray($sql);


echo json_encode($data);
mysqli_close($conn);

?>