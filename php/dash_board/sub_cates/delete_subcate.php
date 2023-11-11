<?php

include("../../general/conn.php");

$subcate_id=$_POST['subcate_id'];


$sql=" DELETE c FROM products p , cart c WHERE p.pro_id=c.pro_id AND  p.subcat_id=$subcate_id;
DELETE r FROM products p , reviews r WHERE p.pro_id=r.pro_id AND  p.subcat_id=$subcate_id;
DELETE i FROM products p , pro_imgs i WHERE p.pro_id=i.pro_id AND  p.subcat_id=$subcate_id;
DELETE FROM products WHERE subcat_id=$subcate_id;
DELETE FROM sub_cates WHERE subcat_id=$subcate_id; ";

$result = mysqli_multi_query($conn, $sql);

if($result)
echo $_POST['subcate_id'];
else
echo "no";

mysqli_close($conn);

?>