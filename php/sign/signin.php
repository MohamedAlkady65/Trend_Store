<?php


include("../general/conn.php");
include("../general/funs.php");

$email = mysqli_real_escape_string($conn, $_POST['email']);
$pass = mysqli_real_escape_string($conn, $_POST['pass']); ;

$sql="SELECT * FROM users WHERE email = '$email' ";


$final = getArray($sql);

if(count($final)>0)

{

    $hashed = $final[0]['pass'];

    if(password_verify($pass,$hashed))
    {
        echo "correct";
        if(isset($_POST['rem']))
        {   
        setcookie("userid",$final[0]['user_id'],time()+3600*24*30,"/webProject");
        }
        else
        {
        setcookie("userid","",time()-3600,"/webProject");
        }
        $_SESSION['userid']=$final[0]['user_id'];
    }
    else
    {
        echo "wrong";
    }
    

}
else
{
    echo "wrong";
}




mysqli_close($conn);

?>

