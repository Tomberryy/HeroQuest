<?php
    $server = "127.0.0.1";
    $login = "root";
    $pass = "";
    $db = "heroquest";

    $conn = new mysqli($server, $login, $pass, $db);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
echo "Connected successfully";

$sql = "SELECT Pv FROM hero";
$result = $conn->query($sql);

echo json_encode($result);

$conn->close();
?>
