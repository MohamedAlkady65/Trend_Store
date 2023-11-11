<?php

include("../../general/conn.php");

$subcate_id=$_POST['subcate_id'];
$cate_id=$_POST['cate_id'];
$newname=$_POST['newname'];


$sql="UPDATE sub_cates SET subcat_name = '$newname' ,cat_id = '$cate_id'  WHERE subcat_id=$subcate_id";

$result = mysqli_query($conn, $sql);

if($result)
echo "ok";
else
echo "no";

mysqli_close($conn);

?>