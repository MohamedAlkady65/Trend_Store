<?php

include("../../general/conn.php");


$cate_id=$_POST['cate_id'];
$newname=$_POST['cate_name'];


$sql="UPDATE cates SET cat_name = '$newname' WHERE cat_id=$cate_id";

$result = mysqli_query($conn, $sql);

if($result)
echo "ok";
else
echo "no";

mysqli_close($conn);

?>