<?php
setcookie("userid","",time()-3600,"/webProject");
if(!isset($_SESSION)) 
{ 
    session_start(); 
}
unset($_SESSION['userid']);
print_r($_SESSION);

header("Location: ../../pages/home.html");
?>

