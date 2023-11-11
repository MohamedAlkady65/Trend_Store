<?php
include("../../general/conn.php");
include("../../general/funs.php");



$query = "SELECT subcat_id,subcat_name,cat_id FROM sub_cates";


$data = getArray($query);


echo json_encode($data);

mysqli_close($conn);

?>