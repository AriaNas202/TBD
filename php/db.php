<?php
$servername = "localhost";
$username = "asaha5";  
$password = "50537657";        
$dbname = "cse442_2024_fall_team_l_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "\n";
}
?>
