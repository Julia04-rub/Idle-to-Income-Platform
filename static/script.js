
function register() {
  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: document.getElementById("regUsername").value,
      password: document.getElementById("regPassword").value
    })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    window.location.href = "/";
  });
}


function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    fetch("/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid login");
        }
    });
}


function loadTasks() {
    fetch("/tasks", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(data => {
        let taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        data.forEach(task => {
            taskList.innerHTML += `
                <div class="task">
                    <b>${task.title}</b> - $${task.reward}<br>
                    ${task.description}<br><br>
                    <button onclick="acceptTask(${task.id}, '${task.title}', ${task.reward})">
                        Accept Task
                    </button>
                </div>
            `;
        });
    });
}


function acceptTask(id, title, reward) {

    fetch(`/accept/${id}`, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });

    let myTasks = document.getElementById("myTasks");

    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    taskDiv.innerHTML = `
        <p><b>${title} - $${reward}</b></p>
        <textarea placeholder="Enter work..."></textarea>
        <button onclick="submitTask(this, '${title}', ${reward})">Submit</button>
    `;

    myTasks.appendChild(taskDiv);
}


function submitTask(button, title, reward) {

    let completed = document.getElementById("completedTasks");

    let done = document.createElement("p");
    done.textContent = title + " - $" + reward;

    completed.appendChild(done);

    let income = document.getElementById("income");
    let current = parseInt(income.textContent.replace("$", ""));
    income.textContent = "$" + (current + reward);

    button.parentElement.remove();
}


function loadEarnings() {
    fetch("/earnings", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(data => {
        let total = 0;

        data.forEach(e => {
            total += e.reward;
        });

        document.getElementById("income").innerText = "$" + total;
    });
}


function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}