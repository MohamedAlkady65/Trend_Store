<?php

include("../../general/conn.php");


$cate_id=$_POST['cate_id'];


$sql="DELETE c FROM products p , sub_cates s , cates c , cart ct WHERE 
p.pro_id=ct.pro_id AND 
p.subcat_id = s.subcat_id AND
c.cat_id = s.cat_id AND 
c.cat_id =$cate_id;

DELETE r FROM products p , sub_cates s , cates c , reviews r WHERE 
p.pro_id=r.pro_id AND 
p.subcat_id = s.subcat_id AND
c.cat_id = s.cat_id AND 
c.cat_id =$cate_id;

DELETE i FROM products p , sub_cates s , cates c , pro_imgs i WHERE 
p.pro_id=i.pro_id AND 
p.subcat_id = s.subcat_id AND
c.cat_id = s.cat_id AND 
c.cat_id =$cate_id;

DELETE p FROM products p , sub_cates s , cates c WHERE 
p.subcat_id = s.subcat_id AND
c.cat_id = s.cat_id AND 
c.cat_id =$cate_id;


DELETE FROM sub_cates WHERE cat_id=$cate_id;

DELETE FROM cates  WHERE cat_id =$cate_id";

$result = mysqli_multi_query($conn, $sql);

if($result)
echo "ok";
else
echo "no";

mysqli_close($conn);

?>