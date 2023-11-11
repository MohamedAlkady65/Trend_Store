<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "ecomdb"; 

$conn = mysqli_connect($servername, $username, $password, $dbname);


if(!isset($_SESSION)) 
{ 
    session_start(); 
}

if(isset($_COOKIE['userid']))
{
    $_SESSION['userid']=$_COOKIE['userid'];

}