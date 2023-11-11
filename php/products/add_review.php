<?php

include("../general/conn.php");

$user_id=2;
$pro_id=1;
$rev_text="wqwqwq";

$sql="INSERT INTO reviews VALUES('',$user_id,$pro_id,'$rev_text')";

$result = mysqli_query($conn, $sql);

if($result)
echo "ok";
else
echo "no";

mysqli_close($conn);

?>