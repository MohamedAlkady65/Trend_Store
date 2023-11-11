<?php

include("../general/conn.php");
include("../general/funs.php");



$sub_query ="";

if(isset($_GET['catid']))
{
    $sub_query .= " AND  cat_id= " . $_GET['catid'];
}


if(isset($_GET['subcatid']))
{
    $sub_query .= " AND  p.subcat_id= " . $_GET['subcatid'];
}

if(isset($_GET['sort']))
{
    if($_GET['sort']==1)
    {
        $sub_query.=" ORDER BY pro_name ";
    }
    elseif($_GET['sort']==2)
    {
        $sub_query.=" ORDER BY price ASC ";
    }
    elseif($_GET['sort']==3)
    {
        $sub_query.=" ORDER BY price DESC ";
    }
}


$sql = "SELECT p.pro_id, pro_name,disc,price,stock , IFNULL(g.path,'default-image.jpg') as path 
FROM products p LEFT OUTER JOIN pro_imgs g ON p.pro_id =g.pro_id AND g.is_default=1  , sub_cates s  WHERE s.subcat_id=p.subcat_id $sub_query ";
$data = getArray($sql);

echo json_encode($data);

mysqli_close($conn);

?>