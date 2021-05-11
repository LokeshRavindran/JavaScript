//add task button
const addTask = document.querySelector(".section-1").lastElementChild;
//input
const task = document.querySelector(".section-1").children[2].children[0];
//ul
const ulSelect = document.querySelector(".section-2").children[1];
// clear tasks button
const clearTask = document.querySelector(".section-2").lastElementChild;

// Adding the task
addTask.addEventListener("click", function (e) {
  if (task.value === "") {
    alert("Please enter a value");
  } else {
    // storing value from ui input field
    let value = document.createTextNode(task.value);

    // storing it in local storage
    let allTasks;
    if (window.localStorage.getItem("tasks") === null) {
      allTasks = [];
    } else {
      allTasks = JSON.parse(localStorage.getItem("tasks"));
    }
    allTasks.push(task.value);
    localStorage.setItem("tasks", JSON.stringify(allTasks));

    // creating an li element
    const li = document.createElement("li");

    // creating a new link tag
    const a = document.createElement("a");

    //   x mark
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(value);
    li.appendChild(a);
    li.setAttribute("id", "tasks");
    ulSelect.appendChild(li);

    task.value = "";
  }
  // e.preventDefault();
});

// clearing all the tasks
clearTask.addEventListener("click", function (e) {
  localStorage.clear();
  location.reload();
});

// displaying already added tasks
if (localStorage.getItem("tasks") != null) {
  const allTasks = JSON.parse(localStorage.getItem("tasks"));
  allTasks.forEach(function (task) {
    let value = document.createTextNode(task);
    // creating an li element
    const li = document.createElement("li");

    // creating a new link tag
    const a = document.createElement("a");

    //   x mark
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(value);
    li.appendChild(a);
    li.setAttribute("class", "tasks");
    ulSelect.appendChild(li);
  });
}

// deleting specific tasks
if (localStorage.getItem("tasks") != null) {
  let allTasks = JSON.parse(localStorage.getItem("tasks"));
  document.querySelectorAll("i").forEach(function (xMark, index) {
    xMark.onclick = function (e) {
      allTasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(allTasks));

      location.reload();
    };
  });
}
