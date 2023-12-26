document.addEventListener("DOMContentLoaded", function () {
    // Check if the user is already logged in
    if (localStorage.getItem("loggedInUser")) {
        showTodoContainer();
        loadTodos();
    } else {
        showAuthContainer();
    }
});

function showAuthContainer() {
    document.getElementById("auth-container").style.display = "block";
    document.getElementById("todo-container").style.display = "none";
}

function showTodoContainer() {
    document.getElementById("auth-container").style.display = "none";
    document.getElementById("todo-container").style.display = "block";
}

function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Check if user exists
    var users = JSON.parse(localStorage.getItem("users")) || [];
    var user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", user.id);
        showTodoContainer();
        loadTodos();
    } else {
        alert("Invalid credentials. Try again.");
    }
}

function signup() {
    var newUsername = document.getElementById("newUsername").value;
    var newPassword = document.getElementById("newPassword").value;

    // Check if the username is already taken
    var users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some(u => u.username === newUsername)) {
        alert("Username already taken. Please choose another one.");
        return;
    }

    // Create a new user
    var newUser = {
        id: Date.now().toString(), // Simple unique ID
        username: newUsername,
        password: newPassword,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Automatically log in the new user
    localStorage.setItem("loggedInUser", newUser.id);

    showTodoContainer();
    loadTodos();
}

function logout() {
    localStorage.removeItem("loggedInUser");
    showAuthContainer();
}

function addTodo() {
    var newTodo = document.getElementById("newTodo").value;
    var userId = localStorage.getItem("loggedInUser");

    // Ensure the user is logged in
    if (!userId) {
        alert("Please log in first.");
        return;
    }

    var userTodos = JSON.parse(localStorage.getItem("todos")) || {};
    var todoList = userTodos[userId] || [];

    todoList.push(newTodo);
    userTodos[userId] = todoList;
    localStorage.setItem("todos", JSON.stringify(userTodos));

    loadTodos();
    document.getElementById("newTodo").value = "";
}

function loadTodos() {
    var userId = localStorage.getItem("loggedInUser");

    // Ensure the user is logged in
    if (!userId) {
        alert("Please log in first.");
        return;
    }

    var userTodos = JSON.parse(localStorage.getItem("todos")) || {};
    var todoList = userTodos[userId] || [];
    var todoListContainer = document.getElementById("todo-list");

    todoListContainer.innerHTML = "";

    todoList.forEach(function (todo) {
        var li = document.createElement("li");
        li.textContent = todo;
        todoListContainer.appendChild(li);
    });
}
