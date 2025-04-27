// const taskManager = [];
let taskManager = JSON.parse(localStorage.getItem("allTask"));
if (taskManager == null) {
  taskManager = [];
}

document.getElementById("addform").addEventListener("submit", (e) => {
  e.preventDefault();

  let todo = document.getElementById("addTask").value;
  taskManager.push({ todo: todo, status: "in-progress" });
  displayContent(taskManager);
  addModal.hide();
});

console.log(taskManager);

const displayContent = (data) => {
  let elements = document.getElementById("content");
  elements.innerHTML = "";

  data.map((val, key) => {
    elements.innerHTML += `
    <div class="card border-0 shadow-sm mt-3">
      <div class="card-body">
        <h2 class="text-capitalize">${val.todo}</h2>
        <button class="btn" onclick = "Edit(${key})">
          <i class="fa-solid fa-pen-to-square"></i> Edit
        </button>
        <button class="btn"  onclick = "Delete(${key})">
          <i class="fa-solid fa-trash"></i> Delete
        </button>


        <span class= "badge  p-2 float-end bg-secondary ${
          val.status == "pending"
            ? "bg-secondary"
            : val.status == "in-progress"
            ? "bg-warning"
            : "bg-success"
        }">
        ${val.status}
        </span>
      </div>
    </div>
`;
  });
  localStorage.setItem("allTask", JSON.stringify(data));
};

let addModal = new bootstrap.Modal(document.getElementById("exampleModal"));
let editModal = new bootstrap.Modal(document.getElementById("editModal"));

const Edit = (id) => {
  editModal.show();
  document.getElementById("editTask").value = taskManager[id].todo;
  document.getElementById("editStatus").value = taskManager[id].status;
  document.getElementById("taskId").value = id;
};

// save

document.getElementById("editform").addEventListener("submit", (e) => {
  let todo = document.getElementById("editTask").value;
  let status = document.getElementById("editStatus").value;
  let id = document.getElementById("taskId").value;
  taskManager[id].todo = todo;
  taskManager[id].status = status;
  displayContent(taskManager);
  editModal.hide();
});

// delete

let Delete = (id) => {
  if (confirm("are you sure")) {
    taskManager.splice(id, 1);
    displayContent(taskManager);
  }
};

displayContent(taskManager);
