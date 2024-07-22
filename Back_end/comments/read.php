<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

require '../connection.php';

// Check if a recipe_id is provided
$recipe_id = isset($_GET['recipe_id']) ? intval($_GET['recipe_id']) : 0;

$sql = "SELECT * FROM comments WHERE recipe_id = $recipe_id ORDER BY created_at DESC";
$result = $conn->query($sql);

$comments = [];
while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
}

echo json_encode($comments);

$conn->close();
?>
