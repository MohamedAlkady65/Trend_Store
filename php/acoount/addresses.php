<?php

include("../general/conn.php");
include("../general/funs.php");


if(isset($_SESSION["userid"]))
{

$user_id =$_SESSION["userid"];
$sql;
if(isset($_GET['add_id']))
{
    $add_id=$_GET['add_id'];

    $sql = "SELECT * FROM addresses WHERE add_id=$add_id AND user_id=$user_id";

}
else
{
    $sql = "SELECT * FROM addresses WHERE user_id=$user_id ORDER BY is_default DESC ";
}

$data = getArray($sql);

echo json_encode($data);
}
mysqli_close($conn);

?>