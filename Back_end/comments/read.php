<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

require '../connection.php';

// Check if a recipe_id is provided
$recipe_id = isset($_GET['recipe_id']) ? intval($_GET['recipe_id']) : 0;

$sql = "SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE comments.recipe_id = $recipe_id ORDER BY comments.created_at DESC";
$result = $conn->query($sql);

$comments = [];
while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
}

echo json_encode($comments);

$conn->close();
?>
