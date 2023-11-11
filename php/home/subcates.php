<?php

include("../general/conn.php");
include("../general/funs.php");






$data = getArray("SELECT subcat_id,subcat_name,s.cat_id,cat_name FROM sub_cates s ,cates c WHERE c.cat_id=s.cat_id");



echo json_encode($data);

mysqli_close($conn);

?>