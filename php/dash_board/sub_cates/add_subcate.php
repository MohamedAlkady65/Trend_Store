<?php

include("../../general/conn.php");


$cate_id=$_POST["cate-id"];
$name=$_POST["input-subcate-name"];


$sql="INSERT INTO sub_cates VALUES('','$cate_id','$name')";

$result = mysqli_query($conn, $sql);

if($result)
echo "ok";
else
echo "no";

mysqli_close($conn);



?>