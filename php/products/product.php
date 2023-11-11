<?php

include("../general/conn.php");
include("../general/funs.php");

$pro_id=$_GET["pro_id"];

$sql = "SELECT * FROM products WHERE pro_id=$pro_id";
$final = getArray($sql);


if(count($final)>0){
$sqlr = "SELECT CONCAT(fname, ' ', lname) as name , rev_text FROM reviews r , users u  WHERE u.user_id=r.user_id AND pro_id =$pro_id ORDER BY rev_id DESC";
$rev = getArray($sqlr);

$sqlm = "SELECT IFNULL(path,'default-image.jpg') as path,is_default FROM pro_imgs WHERE pro_id=$pro_id ORDER BY is_default DESC";
$imgs = getArray($sqlm);

$final[0]["reviews"] = $rev;
$final[0]["imgs"] = $imgs;
$final[0]["spec"]=json_decode($final[0]["spec"]);

echo json_encode($final);
}
else
echo json_encode([]);
mysqli_close($conn);

?>