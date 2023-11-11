<?php

include("../general/conn.php");

if(isset($_SESSION["userid"]))
{

$user_id =$_SESSION["userid"];
$pro_id=$_POST['pro_id'];
$quant=$_POST['quant'];

$sqlCh ="SELECT * FROM cart WHERE user_id=$user_id AND pro_id = $pro_id";

$resCh = mysqli_query( $conn , $sqlCh);

if($resCh)
{

    if(mysqli_num_rows($resCh)==0)
    {
        $sql="INSERT INTO cart VALUES($user_id,$pro_id,$quant,(SELECT price FROM products WHERE pro_id = $pro_id)*$quant)";
    $result = mysqli_query($conn, $sql);
    
    if($result)
    echo "added";
    else
    echo "no";
    }
    else{
        $sql="UPDATE cart SET quant = $quant , total_price =((SELECT price FROM products WHERE pro_id = $pro_id)*$quant) WHERE user_id=$user_id AND pro_id=$pro_id";

        $result = mysqli_query($conn, $sql);
        
        if($result)
        echo "updated";
        else
        echo "no";
    }
    
}
else{
    echo "no";
}
}
else
{
    echo "notUser";
}



mysqli_close($conn);

?>