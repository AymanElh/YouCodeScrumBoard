

// Display and Close form modal

const addTaskBtn = document.getElementById("addTaskBtn");
const modalTask = document.getElementById("modal-task");
const app = document.getElementById("app");
const closeBtn = document.querySelector(".btn-close");

addTaskBtn.addEventListener("click", () => {
  modalTask.style.display = "flex";
})

closeBtn.addEventListener("click", () => {
  modalTask.style.display = "none";
})