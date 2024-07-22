<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

require '../connection.php';

// Check if an ID is provided
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

$sql = "SELECT * FROM recipes WHERE id = $id";
$result = $conn->query($sql);

$recipe = null;
if ($result->num_rows > 0) {
    $recipe = $result->fetch_assoc();
}

echo json_encode($recipe);

$conn->close();
?>
