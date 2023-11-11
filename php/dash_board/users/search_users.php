<?php

include("../../general/conn.php");
include("../../general/funs.php");

$search = $_POST['search'];




$sql = "SELECT u.user_id, CONCAT(fname, ' ', lname) AS full_name, email, phone, 
IFNULL(SUM(o.total_price), 0) AS total_price, IFNULL(SUM(o.total_quant), 0) AS total_quant 
FROM users u LEFT OUTER JOIN orders o ON o.user_id = u.user_id WHERE
u.user_id LIKE '%$search%' OR
CONCAT(fname, ' ', lname) LIKE '%$search%' OR
email LIKE '%$search%' OR
phone LIKE '%$search%' 
GROUP BY u.user_id";


$data = getArray($sql);

echo json_encode($data);




mysqli_close($conn);


?>