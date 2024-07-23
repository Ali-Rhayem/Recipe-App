<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

require '../connection.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

$sql = "SELECT recipes.*, users.username FROM recipes JOIN users ON recipes.user_id = users.id WHERE recipes.id = $id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $recipe = $result->fetch_assoc();
    echo json_encode($recipe);
} else {
    echo json_encode(["error" => "Recipe not found"]);
}

$conn->close();
?>
