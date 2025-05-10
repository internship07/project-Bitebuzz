<?php
session_start();
$conn = new mysqli("localhost", "root", "", "bitebuzz");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username'];
$password = $_POST['password'];

// Use prepared statement to prevent SQL injection
$stmt = $conn->prepare("SELECT * FROM user WHERE username = ? AND password = ?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $_SESSION['username'] = $username;
    header("Location: homepage.html"); // Redirect to homepage
    exit();
} else {
    echo "<script>alert('Invalid username or password'); window.location.href='login.html';</script>";
}

$stmt->close();
$conn->close();
?>
