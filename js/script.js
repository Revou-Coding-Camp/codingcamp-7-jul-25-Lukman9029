let todos = [];

function addTodo() {
  const input = document.getElementById("todoInput");
  const date = document.getElementById("todoDate");
  const task = input.value.trim();
  const dueDate = date.value;

  if (!task || !dueDate) return;

  todos.push({
    id: Date.now(),
    task,
    date: dueDate,
    completed: false,
  });

  input.value = "";
  date.value = "";
  renderTodos();
}

function toggleStatus(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

function deleteAll() {
  todos = [];
  renderTodos();
}

function renderTodos() {
  const list = document.getElementById("todoList");
  const filter = document.getElementById("filterStatus").value;

  const filtered = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  list.innerHTML = "";

  if (filtered.length === 0) {
    list.innerHTML = `
      <tr>
        <td colspan="4" class="py-4 text-gray-400">No task found</td>
      </tr>
    `;
    return;
  }

  filtered.forEach((todo) => {
    list.innerHTML += `
      <tr>
        <td class="py-2 text-gray-400">${todo.task}</td>
        <td>${todo.date}</td>
        <td class="${todo.completed ? "text-green-400" : "text-yellow-400"}">
          ${todo.completed ? "Sudah Beres" : "Belum Beres"}
        </td>
        <td>
          <button onclick="toggleStatus(${todo.id})" class="${
      todo.completed ? "bg-yellow-500" : "bg-green-500"
    } hover:bg-blue-600 px-2 py-1 rounded text-white text-xs mr-1">
            ${todo.completed ? "Undo" : "Do It"}
          </button>
          <button onclick="deleteTodo(${
            todo.id
          })" class="bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-white text-xs">
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}
