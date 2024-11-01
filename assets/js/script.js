// Display and Close form modal

const addTaskBtn = document.getElementById("addTaskBtn");
const modalTask = document.getElementById("modal-task");
const app = document.getElementById("app");
const closeBtn = document.querySelector(".btn-close");
const cancelBtn = document.getElementById("cancel-modal")

function showModal() {
  modalTask.style.display = "flex";
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