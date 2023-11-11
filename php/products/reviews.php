<?php

include("../general/conn.php");
include("../general/funs.php");

$pro_id=1;

$sql = "SELECT rev_id, fname + ' ' + lname as fullname , rev_text FROM reviews r , users u WHERE r.user_id=u.user_id AND pro_id = $pro_id ORDER BY rev_id DESC";

$data = getArray($sql);

echo json_encode($data);

mysqli_close($conn);

?>