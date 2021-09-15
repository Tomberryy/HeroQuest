<?php

header('Access-Control-Allow-Origin: *');


    // Vérifie le content type de la variable $_SERVER pour savoir que methode a reçu le serveur
    $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
    $requestMethod = isset($_SERVER["REQUEST_METHOD"]) ? trim($_SERVER["REQUEST_METHOD"]) : '';

    if ( $requestMethod === 'GET') {
    
        $server = "127.0.0.1";
        $login = "root";
        $pass = "";
        $db = "heroquest";

        $conn = new mysqli($server, $login, $pass, $db);

        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        // echo "Connected successfully";

        $sql = "SELECT * FROM armes WHERE id=1";
        $hero = $conn->query($sql)->fetch_object();

        $result = [
            'hero' => $hero
        ];

        $sql = "SELECT * FROM hero WHERE id=1";
        $hero = $conn->query($sql)->fetch_object();
        echo json_encode($result);


        $conn->close();
    }
?>
