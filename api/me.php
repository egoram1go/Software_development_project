<?php
require 'config.php';
require_auth();

$stmt = $pdo->prepare(
    "SELECT id, email, created_at FROM users WHERE id = ?"
);
$stmt->execute([$_SESSION['user_id']]);

echo json_encode($stmt->fetch());
