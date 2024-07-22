<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require '../connection.php';

$searchTerm = isset($_GET['search']) ? $_GET['search'] : '';

$sql = "SELECT * FROM recipes WHERE name LIKE '%" . $conn->real_escape_string($searchTerm) . "%'";
$result = $conn->query($sql);

$recipes = [];
while ($row = $result->fetch_assoc()) {
    $recipes[] = $row;
}

echo json_encode($recipes);

$conn->close();
?>
