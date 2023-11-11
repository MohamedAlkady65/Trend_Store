<?php


include("../general/conn.php");
include("../general/funs.php");

if(isset($_SESSION["userid"]))
{

$user_id =$_SESSION["userid"];

$pro_id = $_POST['pro_id'];

$text = mysqli_real_escape_string($conn, $_POST['reviewText']);


$sql="INSERT INTO reviews VALUES ('',$user_id,$pro_id,'$text');";

$result = mysqli_query($conn, $sql);

if($result)
echo "ok";
else
echo "no";
}
mysqli_close($conn);
?>

