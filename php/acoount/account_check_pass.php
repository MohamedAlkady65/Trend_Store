<?php

include("../general/conn.php");
include("../general/funs.php");

if(isset($_SESSION["userid"]))
{

$user_id =$_SESSION["userid"];
$cur_pass =$_POST["cur_pass"];


$sql = "SELECT pass FROM users WHERE user_id=$user_id";
$data = getArray($sql);
$hashed = $data[0]['pass'];

if(password_verify($cur_pass,$hashed))
{
    $new_pass = mysqli_escape_string($conn,password_hash($_POST["new_pass"],PASSWORD_DEFAULT));
    $sql = "UPDATE users SET pass='$new_pass'  WHERE user_id=$user_id";
    $result = mysqli_query($conn,$sql);

    if($result)
    {
        echo "updated";
    }
    else{
        echo "faild";
    }

}
else
{
    echo "wrong";
}


}

mysqli_close($conn);

?>