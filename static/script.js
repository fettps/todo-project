async function loadTasks() {
    const response = await fetch("/tasks");
    const tasks = await response.json();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;

        const btn = document.createElement("button");
        btn.textContent = "❌";
        btn.onclick = () => deleteTask(index);

        li.appendChild(btn);
        list.appendChild(li);
    });
}

async function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value;

    if (!task) return;

    await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: task })
    });

    input.value = "";
    loadTasks();
}

async function deleteTask(index) {
    await fetch(/tasks/${index}, {
        method: "DELETE"
    });
    loadTasks();
}

loadTasks();
