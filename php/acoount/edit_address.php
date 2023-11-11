<?php

include("../general/conn.php");

if(isset($_SESSION["userid"]))
{

$user_id =$_SESSION["userid"];

$addid=$_POST['addid'];

$country = mysqli_real_escape_string($conn, $_POST['country']);
$city = mysqli_real_escape_string($conn, $_POST['city']);
$street = mysqli_real_escape_string($conn, $_POST['street']);
$build = mysqli_real_escape_string($conn, $_POST['build']);
$phone = mysqli_real_escape_string($conn, $_POST['phone']);
$note = mysqli_real_escape_string($conn, $_POST['note']);


$sql="UPDATE addresses SET country= '$country' , city= '$city' , street= '$street' , build= '$build' , phone= '$phone' , note = '$note'  WHERE add_id= $addid AND user_id=$user_id;";

$result = mysqli_query($conn, $sql);



if($result)
echo "ok";
else
echo "no";
}

mysqli_close($conn);

?>