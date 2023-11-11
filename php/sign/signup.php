<?php


include("../general/conn.php");
include("../general/funs.php");

$Fname = mysqli_real_escape_string($conn, $_POST['Fname']);
$Lname = mysqli_real_escape_string($conn, $_POST['Lname']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$phone = mysqli_real_escape_string($conn, $_POST['phone']);
$pass = mysqli_real_escape_string($conn, password_hash($_POST['pass'],PASSWORD_DEFAULT));

$sql="INSERT INTO users VALUES ('','$Fname','$Lname','$email','$pass','$phone');";

$result = mysqli_query($conn, $sql);

if($result)
echo "ok";
else
echo "no";

mysqli_close($conn);

?>

