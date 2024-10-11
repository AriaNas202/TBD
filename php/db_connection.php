<?php

$servername = "localhost"; 
$username = "skim243";     
$password = "50440102";  
$dbname = "cse442_2024_fall_team_l_db";     

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}
?>
