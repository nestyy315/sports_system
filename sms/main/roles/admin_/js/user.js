console.log("User.js loaded");

$(document).ready(function () {
    const usersTable = $("#users_table tbody");

    // Function to load users
    function loadUsers() {
        console.log("Loading users...");
        $.ajax({
            url: "../MAIN/roles/admin_/view/user-view.php",
            method: "GET",
            dataType: "html",
            success: function (response) {
                console.log("Users loaded successfully");
                usersTable.html(response);
                bindActions(); // Re-bind actions to dynamically added buttons
            },
            error: function (error) {
                console.error("Error loading users:", error.responseText);
            },
        });
    }

    // Function to bind actions to dynamically added buttons
    function bindActions() {
        // Bind Add User Button
        $("#add-user").off("click").on("click", function () {
            addUser();
        });

        // Bind Edit User Button
        $(".edit-user").off("click").on("click", function () {
            const userId = $(this).data("id");
            editUser(userId);
        });

        // Bind Delete User Button
        $(".delete-user").off("click").on("click", function () {
            const userId = $(this).data("id");
            const username = $(this).data("username");
            deleteUser(userId, username);
        });
    }

    // Function to show Add User modal
    function addUser() {
        $.ajax({
            url: "../MAIN/roles/admin_/add/user-add-modal.html",
            method: "GET",
            success: function (view) {
                $(".modal-container").html(view);
                $("#addUserModal").modal("show");

                // Handle Add User form submission
                $("#form-add-user").on("submit", function (e) {
                    e.preventDefault();
                    saveUser();
                });
            },
            error: function () {
                alert("Error loading Add User modal.");
            },
        });
    }

    // Function to save a new user
    function saveUser() {
        const userData = {
            username: $("#username").val(),
            password: $("#password").val(),
            first_name: $("#first_name").val(),
            last_name: $("#last_name").val(),
            email: $("#email").val(),
            role: $("#role").val(),
        };

        $.ajax({
            url: "../MAIN/roles/admin_/add/user-add.php",
            method: "POST",
            dataType: "json",
            data: userData,
            success: function (response) {
                if (response.status === "success") {
                    $("#addUserModal").modal("hide");
                    loadUsers(); // Reload the user list
                } else {
                    alert(response.message || "Error adding user.");
                }
            },
            error: function () {
                alert("Error saving user.");
            },
        });
    }



    
// Function to show Edit User modal
function editUser(userId) {
    $.ajax({
        url: `../MAIN/roles/admin_/edit/user-edit-modal.html?id=${userId}`,
        method: "GET",
        success: function (view) {
            $(".modal-container").html(view);
            $("#editUserModal").modal("show");

            // Populate user details
            $.ajax({
                url: `../MAIN/roles/admin_/edit/user-edit-fetch.php?id=${userId}`,
                method: "GET",
                dataType: "json",
                success: function (user) {
                    $("#username").val(user.username);
                    $("#first_name").val(user.first_name);
                    $("#last_name").val(user.last_name);
                    $("#email").val(user.email);
                    $("#role").val(user.role);
                },
                error: function () {
                    alert("Error fetching user details.");
                },
            });

            // Handle Edit User form submission
            $("#form-edit-user").on("submit", function (e) {
                e.preventDefault();
                updateUser(userId);
            });
        },
        error: function () {
            alert("Error loading Edit User modal.");
        },
    });
}

// Function to update a user
function updateUser(userId) {
    const userData = {
        user_id: userId,
        username: $("#username").val(),
        first_name: $("#first_name").val(),
        last_name: $("#last_name").val(),
        email: $("#email").val(),
        role: $("#role").val(),
    };

    $.ajax({
        url: "../MAIN/roles/admin_/edit/user-edit.php",
        method: "POST",
        dataType: "json",
        data: userData,
        success: function (response) {
            if (response.status === "success") {
                $("#editUserModal").modal("hide");
                loadUsers(); // Reload the user list
            } else {
                alert(response.message || "Error updating user.");
            }
        },
        error: function () {
            alert("Error updating user.");
        },
    });
}


    // Function to delete a user
// Function to delete a user
function deleteUser(userId, username) {
    if (confirm(`Are you sure you want to delete the user "${username}"?`)) {
        $.ajax({
            url: "../MAIN/roles/admin_/delete/user-delete.php",
            method: "POST",
            dataType: "json",
            data: { user_id: userId },
            success: function (response) {
                if (response.status === "success") {
                    alert("User deleted successfully.");
                    loadUsers(); // Reload the user list to reflect the deletion
                } else {
                    alert(response.message || "Error deleting user.");
                }
            },
            error: function () {
                alert("Error deleting user.");
            },
        });
    }
}



    // Initial Load
    loadUsers();
});
