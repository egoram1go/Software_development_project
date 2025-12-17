<?php
require 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if (!$email || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Email and password required']);
    exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare(
        "INSERT INTO users (email, password_hash) VALUES (?, ?)"
    );
    $stmt->execute([$email, $hash]);

    $_SESSION['user_id'] = $pdo->lastInsertId();

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    http_response_code(409);
    echo json_encode(['error' => 'User already exists']);
}
