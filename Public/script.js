async function register(){

let username=document.getElementById("username").value
let password=document.getElementById("password").value

await fetch("/register",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({username,password})
})

alert("Account created")
window.location="login.html"

}


async function login(){

let username=document.getElementById("username").value
let password=document.getElementById("password").value

let res = await fetch("/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({username,password})
})

let data = await res.json()

if(data.token){

localStorage.setItem("token",data.token)

window.location="dashboard.html"

}else{

alert("Login failed")

}

}


function logout(){

localStorage.removeItem("token")
window.location="login.html"

}


async function loadTasks(){

let token = localStorage.getItem("token")

let res = await fetch("/tasks",{
headers:{Authorization:"Bearer "+token}
})

let tasks = await res.json()

let div = document.getElementById("tasks")

div.innerHTML=""

tasks.forEach(t=>{

div.innerHTML += `

<div class="task-card">

<h3>${t.title}</h3>

<p>${t.description}</p>

<p><b>Reward:</b> $${t.reward}</p>

<button onclick="acceptTask(${t.id})">
Accept Task
</button>

</div>

`

})

}


async function acceptTask(id){

let token = localStorage.getItem("token")

await fetch("/accept/"+id,{
method:"POST",
headers:{Authorization:"Bearer "+token}
})

alert("Task accepted!")

loadTasks()
loadEarnings()

}


async function loadEarnings(){

let token = localStorage.getItem("token")

let res = await fetch("/earnings",{
headers:{Authorization:"Bearer "+token}
})

let data = await res.json()

let div = document.getElementById("earnings")

let total = 0

div.innerHTML=""

data.forEach(e=>{

total += e.reward

div.innerHTML += `

<div class="earning">

Task Completed: ${e.title}

<br>

Income Earned: $${e.reward}

</div>

`

})

document.getElementById("total").innerText="$"+total

}