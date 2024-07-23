<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require '../connection.php';

// Check if a search query is provided
$search = isset($_GET['search']) ? $_GET['search'] : '';

$sql = "SELECT recipes.*, users.username FROM recipes JOIN users ON recipes.user_id = users.id";
if (!empty($search)) {
    $search = $conn->real_escape_string($search);
    $sql .= " WHERE recipes.name LIKE '%$search%' OR recipes.ingredients LIKE '%$search%' OR recipes.steps LIKE '%$search%'";
}

$result = $conn->query($sql);

$recipes = [];
while ($row = $result->fetch_assoc()) {
    $recipes[] = $row;
}

echo json_encode($recipes);

$conn->close();
?>
