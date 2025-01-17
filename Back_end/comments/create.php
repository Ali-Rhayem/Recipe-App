<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require '../connection.php';

// Read JSON data from the request body
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['recipe_id']) && isset($data['comment']) && isset($data['user_id'])) {
    $recipe_id = $data['recipe_id'];
    $comment = $data['comment'];
    $user_id = $data['user_id'];

    $sql = "INSERT INTO comments (recipe_id, comment, user_id) VALUES ('$recipe_id', '$comment', '$user_id')";

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
