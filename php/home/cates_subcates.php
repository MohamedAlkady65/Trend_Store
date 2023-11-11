<?php

include("../general/conn.php");
include("../general/funs.php");





$data = getArray("SELECT * FROM cates");
$final= array();

foreach($data as $cat)
{
    $id = $cat["cat_id"];

    $s = "SELECT * FROM sub_cates where cat_id= $id ";

    $data = getArray($s);
    $cat["sub_cates"]=$data;
    $final[]=$cat;

}

echo json_encode($final);

mysqli_close($conn);

?>