<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require '../connection.php';

// Read JSON data from the request body
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['name']) && isset($data['image_url']) && isset($data['ingredients']) && isset($data['steps']) && isset($data['user_id'])) {
    $name = $data['name'];
    $image_url = $data['image_url'];
    $ingredients = $data['ingredients'];
    $steps = $data['steps'];
    $user_id = $data['user_id'];

    $sql = "INSERT INTO recipes (name, image_url, ingredients, steps, user_id) VALUES ('$name', '$image_url', '$ingredients', '$steps', '$user_id')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid input"]);
}

$conn->close();
?>
