<?php

include("../general/conn.php");
include("../general/funs.php");




$data = getArray("SELECT * FROM cates");
$final= array();

foreach($data as $cat)
{
    $id = $cat["cat_id"];

    $s = "SELECT p.pro_id, pro_name,disc,price,stock, IFNULL(g.path,'default-image.jpg') as path
    FROM  sub_cates s  , products p LEFT OUTER JOIN pro_imgs g
    ON  p.pro_id =g.pro_id AND g.is_default=1  WHERE p.subcat_id=s.subcat_id and s.cat_id= $id ORDER BY pro_name ";

    $data = getArray($s);

    $cat["products"]=$data;
    $final[]=$cat;

}

echo json_encode($final);

mysqli_close($conn);

?>