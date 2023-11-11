<?php

include("../general/conn.php");
include("../general/funs.php");

$sql="SELECT p.pro_id, p.pro_name,disc,p.price,stock , IFNULL(g.path,'default-image.jpg') as path , SUM(quant) as qu
FROM products p LEFT OUTER JOIN order_items o   ON p.pro_id=o.pro_id 
LEFT OUTER JOIN pro_imgs g ON p.pro_id =g.pro_id AND g.is_default=1
GROUP BY p.pro_id ORDER BY qu DESC LIMIT 8 ";


$data = getArray($sql);

echo json_encode($data);

mysqli_close($conn);

?>