<?php
include '../connection.php';

$sql = "SELECT * FROM recipes";
$result = $conn->query($sql);

$recipes = [];
while ($row = $result->fetch_assoc()) {
    $recipes[] = $row;
}

echo json_encode($recipes);

$conn->close();
?>
