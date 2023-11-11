<?php
include("../general/conn.php");
include("../general/funs.php");

if(isset($_SESSION["userid"]))
{

$user_id =$_SESSION["userid"];

$sql = "SELECT p.pro_id, pro_name,disc,price,stock , quant,total_price , IFNULL(path,'default-image.jpg') as path
FROM  cart c , products p LEFT OUTER JOIN pro_imgs g 
ON  p.pro_id =g.pro_id AND g.is_default=1 WHERE user_id=$user_id AND p.pro_id = c.pro_id ";
$data = getArray($sql);

echo json_encode($data);
}
mysqli_close($conn);

?>