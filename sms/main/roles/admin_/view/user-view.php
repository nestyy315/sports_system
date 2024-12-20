<?php
require_once __DIR__ . '/../../../database/database.class.php';

$conn = (new Database())->connect();

try {
    $query = $conn->prepare("SELECT user_id, username, first_name, last_name, email, role FROM users");
    $query->execute();
    $users = $query->fetchAll(PDO::FETCH_ASSOC);

    foreach ($users as $user) {
        echo "
            <tr>
                <td>{$user['username']}</td>
                <td>{$user['role']}</td>
                <td>{$user['first_name']}</td>
                <td>{$user['last_name']}</td>
                <td>{$user['email']}</td>
                <td>
                    <button class='btn btn-warning edit-user' data-id='{$user['user_id']}' data-username='{$user['username']}'>Edit</button>
                    <button class='btn btn-danger delete-user' data-id='{$user['user_id']}' data-username='{$user['username']}'>Delete</button>
                </td>
            </tr>
        ";
    }
} catch (Exception $e) {
    echo "<tr><td colspan='6'>Error: {$e->getMessage()}</td></tr>";
}
?>
