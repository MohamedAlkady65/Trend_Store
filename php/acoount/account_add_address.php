<?php


include("../general/conn.php");
include("../general/funs.php");

if(isset($_SESSION["userid"]))
{

$user_id =$_SESSION["userid"];

$country = mysqli_real_escape_string($conn, $_POST['country']);
$city = mysqli_real_escape_string($conn, $_POST['city']);
$street = mysqli_real_escape_string($conn, $_POST['street']);
$build = mysqli_real_escape_string($conn, $_POST['build']);
$phone = mysqli_real_escape_string($conn, $_POST['phone']);
$note = mysqli_real_escape_string($conn, $_POST['note']);
$def;

$check = "SELECT * FROM addresses WHERE user_id=$user_id";

$res = mysqli_query($conn, $check);

if(mysqli_num_rows($res)==0)
{
    $def=1;
}
else{
    $def=0;
}


$sql="INSERT INTO addresses VALUES ('','$user_id','$country','$street','$city','$build','$phone','$note',$def)";

$result = mysqli_query($conn, $sql);

if($result)
echo "ok";
else
echo "no";
}
mysqli_close($conn);
?>

