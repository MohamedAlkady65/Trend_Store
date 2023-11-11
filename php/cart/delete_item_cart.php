<?php

include("../general/conn.php");

if(isset($_SESSION["userid"]))
{

$user_id =$_SESSION["userid"];
$pro_id= $_POST['pro_id'];

$sql="DELETE FROM cart WHERE user_id=$user_id AND pro_id=$pro_id";

$result = mysqli_query($conn, $sql);

if($result)
echo "ok";
else
echo "no";
}
mysqli_close($conn);

?>