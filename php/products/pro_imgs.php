<?php

include("../general/conn.php");
include("../general/funs.php");

$pro_id=1;

$sql = "SELECT img_id,IFNULL(path,'default-image.jpg') as path,is_default FROM pro_imgs WHERE pro_id=$pro_id";
$data = getArray($sql);

echo json_encode($data);

mysqli_close($conn);

?>