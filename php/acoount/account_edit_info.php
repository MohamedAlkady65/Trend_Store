<?php


include("../general/conn.php");
include("../general/funs.php");

if(isset($_SESSION["userid"]))
{

$user_id =$_SESSION["userid"];

$Fname = mysqli_real_escape_string($conn, $_POST['fname']);
$Lname = mysqli_real_escape_string($conn, $_POST['lname']);
$phone = mysqli_real_escape_string($conn, $_POST['phone']);

$sql="UPDATE users SET fname = '$Fname' , lname='$Lname',phone='$phone' WHERE user_id = $user_id ";

$result = mysqli_query($conn, $sql);

if($result)
echo "ok";
else
echo "no";
}
mysqli_close($conn);
?>

