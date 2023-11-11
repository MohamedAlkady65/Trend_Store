<?php
include("conn.php");

function getArray($sql)
{
    global $conn;;
    $result = mysqli_query($conn, $sql);
    $data = array();
    while($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

return $data;

}
