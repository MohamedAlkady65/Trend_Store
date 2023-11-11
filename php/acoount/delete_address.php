<?php

include("../general/conn.php");


$addid=$_POST['addid'];


$sql="DELETE FROM addresses WHERE add_id= $addid;";

$result = mysqli_query($conn, $sql);

if($result)
echo "ok";
else
echo "no";

mysqli_close($conn);

?>