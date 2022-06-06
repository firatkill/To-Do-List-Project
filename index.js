// define constants
const input = document.querySelector("#input");
const addButton = document.querySelector("#addButton");
const list = document.querySelector(".list-group");
const clearButton = document.querySelector("#clearButton");
//eventListeners
addButton.addEventListener("click", () => {
  addTodo(input.value.trim());
});
document.addEventListener("DOMContentLoaded", loadAllTodos);
list.addEventListener("mousedown", router);
clearButton.addEventListener("click", clearTodos);
//functions
function clearTodos() {
  clearStorage();
  list.innerHTML = "";
}

function router(e) {
  if (e.target.classList == "fa-regular fa-circle-check") {
    todoDone(e);
  } else if (e.target.classList == "fa-regular fa-pen-to-square") {
    editTodo(e.target);
  } else if (e.target.classList == "fa-solid fa-trash") {
    deleteTodo(e);
    updateStorage();
  }
}
function deleteTodo(e) {
  e.target.parentElement.parentElement.parentElement.remove();
}
function editTodo(e) {
  let target = e.parentElement.parentElement.previousElementSibling;

  document.getElementById("changeButton").onclick = () => {
    if (document.getElementById("changeInput").value.trim() != "") {
      target.textContent = document.getElementById("changeInput").value;
      document.getElementById("changeInput").value = "";
      updateStorage();
    }
  };
}
function todoDone(e) {
  e.target.parentElement.parentElement.parentElement.style.backgroundColor =
    "green";
  e.target.parentElement.parentElement.parentElement.style.color = "white";
  e.target.parentElement.style.color = "white";
  e.target.parentElement.nextElementSibling.style.color = "white";
  e.target.parentElement.nextElementSibling.nextElementSibling.style.color =
    "white";
  updateStorage();
}
function loadAllTodos() {
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((elem) => {
    addTodoToUI(elem);
  });
}
function updateStorage() {
  clearStorage();
  let nodes = document.getElementsByClassName("list-group-item");

  for (let elem of nodes) {
    addTodoToStorage(elem.firstElementChild.textContent);
  }
}
function clearStorage() {
  localStorage.removeItem("todos");
}
function addTodoToStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") == null) {
    localStorage.setItem("todos", JSON.stringify([todo]));
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    console.log(todos);
    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

function addTodo(todo) {
  if (todo != "") {
    addTodoToUI(todo);
    addTodoToStorage(todo);
    input.value = "";
  }
}

function addTodoToUI(todo) {
  list.innerHTML += ` <li  class="list-group-item">
                <p class="text-capitalize" style="margin-bottom:0">${todo}</p>
                <div>
                    <a class="check"  href="#"><i class="fa-regular fa-circle-check"></i></a>
                    <a class="edit" href="#"><i data-bs-toggle="modal" data-bs-target="#exampleModal" class="fa-regular fa-pen-to-square"></i></a>
                    <a class="delete" href="#"><i class="fa-solid fa-trash"></i></a>
                </div>

            </li>`;
}
