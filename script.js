const taskInput = document.getElementById("taskInput");
const noteInput = document.getElementById("noteInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const closeBtn = document.querySelector(".close-btn");

// Add Task
addButton.addEventListener("click", handleAddTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") handleAddTask();
});

noteInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") handleAddTask();
});

function handleAddTask() {
  const taskText = taskInput.value.trim();
  const noteText = noteInput.value.trim();

  if (taskText !== "") {
    addTask(taskText, noteText);
    taskInput.value = "";
    noteInput.value = "";
  }
}

function addTask(taskText, customNote = "") {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;
  span.style.flexGrow = 1;
  li.appendChild(span);

  const infoBtn = document.createElement("button");
  infoBtn.textContent = "ℹ️";
  infoBtn.className = "info";
  infoBtn.onclick = () => showInfo(taskText, customNote);
  li.appendChild(infoBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className = "delete";
  deleteBtn.onclick = () => li.remove();
  li.appendChild(deleteBtn);

  li.addEventListener("dblclick", () => {
    li.classList.toggle("done");
  });

  taskList.appendChild(li);
}

function showInfo(task, note) {
  const benefit = generateAIText(task);
  const noteText = note ? `\n🗒️ Note: ${note}` : "";
  modalText.textContent = `${benefit}${noteText}`;
  modal.style.display = "block";
}

// Simulated AI logic
function generateAIText(task) {
  const keyword = task.toLowerCase();

  if (keyword.includes("gym") || keyword.includes("exercise")) {
    return "🏋️ Going to the gym boosts your physical health and mental clarity.";
  } else if (keyword.includes("study")) {
    return "📘 Studying builds your knowledge and prepares you for the future.";
  } else if (keyword.includes("code") || keyword.includes("program")) {
    return "💻 Coding helps develop logical thinking and career skills.";
  } else if (keyword.includes("clean")) {
    return "🧹 Cleaning improves your environment and reduces stress.";
  } else {
    // Generic AI-like benefit
    return `✨ Doing "${task}" contributes to personal growth or productivity.`;
  }
}

// Close modal on close button click
closeBtn.onclick = () => {
  modal.style.display = "none";
};

// Close modal on outside click
window.onclick = function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};
