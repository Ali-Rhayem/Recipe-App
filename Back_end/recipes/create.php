<?php
include '../connection.php';

$name = $_POST['name'];
$image_url = $_POST['image_url'];
$ingredients = $_POST['ingredients'];
$steps = $_POST['steps'];

$sql = "INSERT INTO recipes (name, image_url, ingredients, steps) VALUES ('$name', '$image_url', '$ingredients', '$steps')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
