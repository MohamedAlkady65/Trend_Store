<?php

include("../general/conn.php");


$addid=$_POST['addid'];
$user_id =$_SESSION["userid"];


$sql="UPDATE addresses SET is_default=0 WHERE user_id= $user_id; 
        UPDATE addresses SET is_default=1 WHERE add_id= $addid;
";

$result = mysqli_multi_query($conn, $sql);

if($result)
echo "ok";
else
echo "no";

mysqli_close($conn);

?>