<?php

include("../general/conn.php");


$order_id=$_POST['order_id'];
$stat =$_POST['status'];


$sql="UPDATE orders SET order_status=$stat WHERE order_id= $order_id";

$result = mysqli_query($conn, $sql);

if($result)
echo "ok";
else
echo "no";

mysqli_close($conn);

?>