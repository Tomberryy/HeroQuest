<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


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

$sql = "SELECT * FROM hero";
$result = $conn->query($sql)->fetch_all();

echo json_encode($result);


$conn->close();
?>
