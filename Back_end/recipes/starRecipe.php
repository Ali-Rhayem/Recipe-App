<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require '../connection.php';

// Read JSON data from the request body
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['recipe_id']) && isset($data['user_id'])) {
    $recipe_id = $data['recipe_id'];
    $user_id = $data['user_id'];

    $sql = "INSERT INTO stars (user_id, recipe_id) VALUES ('$user_id', '$recipe_id') ON DUPLICATE KEY UPDATE user_id = user_id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        error_log("Error starring recipe: " . $conn->error);
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
} else {
    error_log("Invalid input: " . json_encode($data));
    echo json_encode(["success" => false, "error" => "Invalid input"]);
}

$conn->close();
?>
