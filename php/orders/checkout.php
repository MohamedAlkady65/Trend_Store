<?php
include("../general/conn.php");
include("../general/funs.php");

if(isset($_SESSION["userid"]))
{

$user_id =$_SESSION["userid"];


$sqlTotals = "SELECT IFNULL(SUM(total_price),0) as final_total_price , IFNULL(SUM(quant),0) as total_quant FROM cart WHERE user_id=$user_id";

$totals = getArray($sqlTotals)[0] ;

$datee=date("Y-m-d");
$address=$_POST['address'];
$total_price=$totals['final_total_price'];
$total_quant=$totals['total_quant'];


mysqli_query($conn,"INSERT INTO orders VALUES ('',$user_id,'$datee','$address',$total_price,$total_quant,1);");
$orderid=getArray("SELECT MAX(order_id) as lastid FROM orders")[0]['lastid'];





$sql = "SELECT p.pro_id, pro_name,price,stock ,quant , stock - quant as new_stock ,total_price , IFNULL(path,'default-image.jpg') as path
FROM  cart c , products p LEFT OUTER JOIN pro_imgs g 
ON  p.pro_id =g.pro_id AND g.is_default=1 WHERE user_id=$user_id AND p.pro_id = c.pro_id ";



$data = getArray($sql);

$insertQuery="";

foreach( $data as $one )
{
    $pro_id = $one['pro_id'];
    $pro_name = $one['pro_name'];
    $path = $one['path'];
    $price = $one['price'];
    $quant = $one['quant'];
    $total_price = $one['total_price'];
    $new_stock =$one['new_stock'];

    $insertQuery .= "INSERT INTO order_items VALUES ($orderid,$pro_id,'$pro_name','$path',$price,$quant,$total_price);
                    UPDATE products SET stock=$new_stock WHERE pro_id=$pro_id;
    ";

}

$insertQuery.="DELETE FROM cart WHERE user_id = $user_id";


$result = mysqli_multi_query($conn,$insertQuery);

if($result)
{
    echo "ok";
}
else
{
    echo "no";
}
}
mysqli_close($conn);

?>