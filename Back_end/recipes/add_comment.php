<?php
include '../connection.php';

$recipe_id = $_POST['recipe_id'];
$comment = $_POST['comment'];

$sql = "INSERT INTO comments (recipe_id, comment) VALUES ('$recipe_id', '$comment')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
