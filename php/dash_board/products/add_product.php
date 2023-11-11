<?php

include("../../general/conn.php");
include("../../general/funs.php");


$subcate_id=$_POST['subcate'];
$name=$_POST['name'];
$disc=$_POST['desc'];
$spec=$_POST['spec'];
$price=$_POST['price'];
$stock=$_POST['stock'];
$def = $_POST['defaultImg'];

$sql="INSERT INTO products VALUES ('','$subcate_id','$name','$disc','$spec','$price','$stock')";

$result = mysqli_query($conn, $sql);


$maxsql = "SELECT MAX(p.pro_id) as max_pro , MAX(img_id) max_img FROM products p ,pro_imgs";
$maxes = 




$types = array_map(function ($ele) { return explode("/",$ele)[1]; }, $_FILES["imgsToUpload"]['type']);
$imgs = $_FILES["imgsToUpload"]["tmp_name"];


$query = "";
$pro_id=getArray("SELECT MAX(pro_id) as max_pro FROM products ")[0]['max_pro'];

$max_img=getArray("SELECT MAX(img_id) as max_img FROM pro_imgs  ")[0]['max_img'];

if($max_img==null)
$max_img=0;

$start=$max_img+1;


$target_dir = "../../../Uploads/products_images/";
foreach ( $imgs as $ind => $img)
{
    $file_name="im-".$start .".". $types[$ind];
    $target_file = $target_dir .$file_name ;

    if (move_uploaded_file($img, $target_file)) {
        if($ind==$def)
        $query.="INSERT INTO pro_imgs VALUES('',$pro_id,'$file_name',1);
        ";
        else
        $query.="INSERT INTO pro_imgs VALUES('',$pro_id,'$file_name',0);
        ";
      } 

    $start++;

}



$fin = mysqli_multi_query($conn, $query);

mysqli_close($conn);

if($fin)
echo "ok";
else
echo "no";


?>