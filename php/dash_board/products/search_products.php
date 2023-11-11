<?php

include("../../general/conn.php");
include("../../general/funs.php");

$pro_name = $_GET['pro_name'];

$data = getArray("SELECT pro_id, pro_name ,c.cat_name,s.subcat_name,price,stock FROM products p ,sub_cates s , cates c WHERE p.subcat_id=s.subcat_id AND s.cat_id = c.cat_id AND pro_name LIKE '%".$pro_name."%';");


$final= array();

foreach($data as $pro)
{
    $id = $pro["pro_id"];

    $s = "SELECT pro_id , SUM(quant) as num_sales  FROM order_items WHERE pro_id=$id GROUP BY quant";

    $data = getArray($s);

    if(count($data)==0)
        $pro["num_sales"]=0;
    else
        $pro["num_sales"]=$data[0]['num_sales'];
    $final[]=$pro;

}

echo json_encode($final);

mysqli_close($conn);

?>