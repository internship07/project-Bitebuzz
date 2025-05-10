<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database connection
$conn = new mysqli("localhost", "root", "", "bitebuzz");

if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed."]);
    exit;
}

// Decode JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['username'], $data['password'])) {
    echo json_encode(["success" => false, "message" => "Invalid request."]);
    exit;
}

// Sanitize input
$username = mysqli_real_escape_string($conn, $data['username']);
$password = $data['password'];

// Fetch stored password from database
$stmt = $conn->prepare("SELECT password FROM user WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    // Handle both hashed passwords and plain text passwords
    if (password_verify($password, $row['password']) || $password === $row['password']) {
        $_SESSION['username'] = $username;

        // Insert login attempt into the new table
        $log_stmt = $conn->prepare("INSERT INTO login_logs (username, login_time) VALUES (?, NOW())");
        $log_stmt->bind_param("s", $username);
        $log_stmt->execute();
        $log_stmt->close();

        echo json_encode(["success" => true, "redirect" => "homepage.html"]);
    } else {
        echo json_encode(["success" => false, "message" => "Incorrect password."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "User not found."]);
}

$stmt->close();
$conn->close();
?>
