<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require '../connection.php';

// Read JSON data from the request body
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id']) && isset($data['user_id'])) {
    $id = $data['id'];
    $user_id = $data['user_id'];

    // Delete comments associated with the recipe
    $deleteComments = "DELETE FROM comments WHERE recipe_id = $id";
    if ($conn->query($deleteComments) === TRUE) {
        // Delete the recipe
        $deleteRecipe = "DELETE FROM recipes WHERE id = $id AND user_id = $user_id";
        if ($conn->query($deleteRecipe) === TRUE) {
            echo json_encode(["success" => true]);
        } else {
            error_log("Error deleting recipe: " . $conn->error);
            echo json_encode(["success" => false, "error" => $conn->error]);
        }
    } else {
        error_log("Error deleting comments: " . $conn->error);
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
} else {
    error_log("Invalid input: " . json_encode($data));
    echo json_encode(["success" => false, "error" => "Invalid input"]);
}

$conn->close();
?>
