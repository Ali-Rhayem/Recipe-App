<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require '../connection.php';

$name = $_POST['name'];
$ingredients = $_POST['ingredients'];
$steps = $_POST['steps'];
$user_id = $_POST['user_id'];
$image_url = '';

if (isset($_FILES['image'])) {
    $image = $_FILES['image'];
    $image_name = time() . '_' . $image['name'];
    $target_dir = "../../uploads/";
    $target_file = $target_dir . basename($image_name);

    if (move_uploaded_file($image['tmp_name'], $target_file)) {
        $image_url = 'http://localhost/recipe-app/uploads/' . $image_name;
    } else {
        echo json_encode(["success" => false, "message" => "Failed to upload image"]);
        exit;
    }
}

$sql = "INSERT INTO recipes (name, image_url, ingredients, steps, user_id) VALUES ('$name', '$image_url', '$ingredients', '$steps', '$user_id')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
