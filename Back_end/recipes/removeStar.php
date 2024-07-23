<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require '../connection.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['recipe_id']) && isset($data['user_id'])) {
    $recipe_id = $data['recipe_id'];
    $user_id = $data['user_id'];

    $sql = "DELETE FROM stars WHERE user_id = '$user_id' AND recipe_id = '$recipe_id'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        error_log("Error removing star: " . $conn->error);
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
} else {
    error_log("Invalid input: " . json_encode($data));
    echo json_encode(["success" => false, "error" => "Invalid input"]);
}
