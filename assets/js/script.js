

// Display and Close form modal

const addTaskBtn = document.getElementById("addTaskBtn");
const formModal = document.getElementById("modal-task");
const app = document.getElementById("app")
addTaskBtn.addEventListener("click", () => {
  formModal.classList.replace("d-none", "show-modal");
  app.classList.add("background-blur");
})

const closeBtn = document.querySelector(".btn-close");

closeBtn.addEventListener("click", () => {
  formModal.classList.replace("show-modal", "d-none");
  app.classList.remove("background-blur");
})