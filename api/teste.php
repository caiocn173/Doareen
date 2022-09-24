<?php

$servername = "sql203.epizy.com";
$username = "epiz_32661291";
$password = "D6UrJcFFcxgW";
$dbName = "doareen";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbName);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

?>