<?php

include("../../general/conn.php");

$proid=$_POST['proid'];
$newstock=$_POST['newstock'];

$sql="UPDATE products SET stock = $newstock  WHERE pro_id=$proid";

$result = mysqli_query($conn, $sql);

if($result)
echo "ok";
else
echo "no";

mysqli_close($conn);

?>