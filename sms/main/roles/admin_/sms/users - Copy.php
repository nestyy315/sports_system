<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    header('Location: ../auth/login.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>User Management</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-4">
    <h2>User Management</h2>
    <button class="btn btn-primary my-3" id="add-user">Add User</button>

    <div class="table-responsive">
        <table id="users_table" class="table table-hover align-middle">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <!-- Populated via JavaScript -->
            </tbody>
        </table>
    </div>
</div>

<!-- Placeholder for dynamically loaded modals -->
<div class="modal-container"></div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="../MAIN/roles/admin_/js/user.js"></script>
</body>
</html>
