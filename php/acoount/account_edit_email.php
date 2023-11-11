<?php


include("../general/conn.php");
include("../general/funs.php");

if(isset($_SESSION["userid"]))
{

$user_id =$_SESSION["userid"];

$email = mysqli_real_escape_string($conn, $_POST['email']);

$sql="UPDATE users SET email = '$email' WHERE user_id = $user_id ";

$result = mysqli_query($conn, $sql);

if($result)
echo "ok";
else
echo "no";
}
mysqli_close($conn);
?>

