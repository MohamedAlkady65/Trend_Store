<?php

include("../../general/conn.php");

$pro_id=$_POST['pro_id'];


$sql="DELETE FROM cart WHERE pro_id = $pro_id;
DELETE FROM pro_imgs WHERE pro_id = $pro_id;
DELETE FROM reviews WHERE pro_id = $pro_id;
DELETE FROM products WHERE pro_id = $pro_id;";

$result = mysqli_multi_query($conn, $sql);

if($result)
echo "ok";
else
echo "no";

mysqli_close($conn);

?>