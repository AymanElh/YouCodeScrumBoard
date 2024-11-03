// Display and Close form modal

const addTaskBtn = document.getElementById("addTaskBtn");
const modalTask = document.getElementById("modal-task");
const closeBtn = document.querySelector(".btn-close");
const cancelBtn = document.getElementById("cancel-modal")

function showModal() {
  modalTask.style.display = "flex";
  modalTask.classList.remove("d-none");
}
function hideModal() {
  modalTask.style.display = "none";
}

addTaskBtn.addEventListener("click", showModal)
closeBtn.addEventListener("click", hideModal)
cancelBtn.addEventListener("click", hideModal)

window.addEventListener("click", (event) => {
  if(event.target === modalTask) {hideModal()};
})


// Function to add tasks

let toDoTaskArr = [];
let doingTaskArr = [];
let doneTaskArr = [];

const saveBtn = document.getElementById("task-save-btn");

function addTask() {
  // Get the inputs from the user
  const taskTitle = document.getElementById("task-title");
  const taskType = document.querySelector("input[name='task-type']:checked");
  const taskPriority = document.getElementById("task-priority");
  const taskStatus = document.getElementById("task-status");
  const taskDate = document.getElementById("task-date");
  const taskDescription = document.getElementById("task-description");

  // check the inputs 
  if(!taskTitle.value || !taskType.value || !taskPriority.value || !taskStatus.value || !taskDate.value || !taskDescription.value) {
    Swal.fire({
      title: 'Error!',
      text: 'Please fill all inputs.',
      icon: 'error',
      confirmButtonText: 'Try Again'
    });
    return;
  }

  let newTask = {
    id: Date.now(),
    title: taskTitle.value,
    type: taskType.value,
    priority: taskPriority.value,
    status: taskStatus.value,
    date: taskDate.value,
    description: taskDescription.value
  }

  if (newTask.status === "To Do") {
    toDoTaskArr.push(newTask);
  }
  else if (newTask.status === "In Progress") {
    doingTaskArr.push(newTask);
  }
  else if (newTask.status === "Done") {
    doneTaskArr.push(newTask);
  }

  // reset inputs 
  taskTitle.value = "";
  taskType.checked = false;
  taskPriority.value = "";
  taskStatus.value = "";
  taskDate.value = "";
  taskDescription.value = "";

  addToHtml(newTask);
  hideModal();
  Swal.fire({
    title: "Task Added",
    icon: "success"
  })

}

// Function add the element to html
function addToHtml(task) {
  const taskContainer = document.getElementById(`${task.status.toLowerCase().replace(" ", "-")}-tasks`)

  const taskItem = document.createElement("a");
  taskItem.classList.add("list-group-item", "list-group-item-action", "d-flex");
  taskItem.style.cursor = "pointer";
  // set the attribute on click for task so can read them when click
  taskItem.setAttribute("onclick", `showTaskInfos(${task.id})`)

  function minimizeText(text, max) {
    if(text.length > max) {
      return text.slice(0, 100) + "..."
    }
    return text;
  }

  // increment the number of tasks on the html
  if(task.status === "To Do") {
    document.getElementById("to-do-tasks-count").textContent = toDoTaskArr.length
  }
  else if (task.status === "In Progress") {
    document.getElementById("in-progress-tasks-count").textContent = doingTaskArr.length;
  }
  else if (task.status === "Done") {
    document.getElementById("done-tasks-count").textContent = doneTaskArr.length;
  }

  taskItem.innerHTML = `
    <div class="me-3 fs-16px">
      
    </div>
    <div class="flex-fill">
      <div class="fs-14px lh-12 mb-2px fw-bold text-dark">
        ${task.title}
      </div>
      <div class="mb-1 fs-12px">
        <div class="text-gray-600 flex-1">
          ${minimizeText(task.description, 100)}
        </div>
      </div>
      <div class="mb-1">
        <span class="badge bg-gray-300 text-gray-900">${task.type}</span>
        <span class="badge bg-indigo">${task.priority}</span>
      </div>
    </div>
  `

  taskContainer.appendChild(taskItem);

}

saveBtn.addEventListener("click", event => {
  event.preventDefault();
  addTask();
});


// Show task informations

function showTaskInfos(id) {
  
  let task = toDoTaskArr.concat(doingTaskArr, doneTaskArr).find(t => t.id === id);

  document.getElementById("show-task-title").textContent = task.title;
  document.getElementById("show-task-date").textContent = task.date;
  document.getElementById("show-task-type").textContent = task.type;
  document.getElementById("show-task-feature").textContent = task.feature;
  document.getElementById("show-task-priority").textContent = task.priority;
  document.getElementById("show-task-description").textContent = task.description;

  document.querySelector(".show-modal-overlay").classList.remove("d-none");

  document.getElementById("close-btn-2").addEventListener("click", () => {
    document.querySelector(".show-modal-overlay").classList.add("d-none");
  });

  document.getElementById("task-update-btn").addEventListener("click", () => {updateTask(task)})
}


// Update task


function updateTask(task) {

  document.querySelector(".show-modal-overlay").classList.add("d-none");

  // Get the elements on the modal
  document.getElementById("task-title").value = task.title;
  document.querySelector(`input[name="task-type"][value="${task.type}"]`).chechek = true;
  document.getElementById("task-priority").value = task.priority;
  document.getElementById("task-status").value = task.status;
  document.getElementById("task-date").value = task.date;
  document.getElementById("task-description").value = task.description;

  const saveBtn = document.getElementById("task-save-btn");
  saveBtn.classList.replace("btn-primary", "btn-warning");
  saveBtn.textContent = "Save Changes";
  document.querySelector(".modal-title").textContent = "Update Task"


  showModal();
  saveBtn.replaceWith(saveBtn.cloneNode(true));
  const newSaveBtn = document.getElementById("task-save-btn");
  newSaveBtn.addEventListener("click", saveUpdatedTask);

  

  function saveUpdatedTask() {

    task.title = document.getElementById("task-title").value;
    task.type = document.querySelector("input[name='task-type']:checked").value;
    task.priority = document.getElementById("task-priority").value;
    task.status = document.getElementById("task-status").value;
    task.date = document.getElementById("task-date").value;
    task.description = document.getElementById("task-description").value;

    // Upload the task on its array;
    if (task.status === "To Do") {
      updateTaskArr(task, toDoTaskArr);
    }
    else if (task.status === "In Progress") {
      updateTaskArr(task, doingTaskArr);
    }
    else if (task.status === "Done") {
      updateTaskArr(task, doneTaskArr);
    }

    console.log(toDoTaskArr);
    console.log(doingTaskArr);
    console.log(doneTaskArr);

    updateTaskToHtml();

    hideModal();
    Swal.fire ({
      title: "Task updated",
      icon: "success"
    })

  }
}


function updateTaskArr(task, arr) {
  const idx = arr.findIndex(t => t.id === task.id);
  if (idx !== -1) {
    arr[idx] = task;
  }

  
}

function updateTaskToHtml() {
  document.getElementById("to-do-tasks").innerHTML = "";
  document.getElementById("in-progress-tasks").innerHTML = "";
  document.getElementById("done-tasks").innerHTML = "";

  toDoTaskArr.forEach(task => addToHtml(task));
  doingTaskArr.forEach(task => addToHtml(task));
  doneTaskArr.forEach(task => addToHtml(task));

  // update counters
  document.getElementById("to-do-tasks-count").value = toDoTaskArr.length;
  document.getElementById("in-progress-tasks-count").value = doingTaskArr.length;
  document.getElementById("done-tasks-count").value = doneTaskArr.length;

}