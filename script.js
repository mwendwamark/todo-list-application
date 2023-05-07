window.addEventListener("load", function () {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const listEl = document.querySelector("#tasks");

  let tasks = [];

  // Retrieve tasks from LocalStorage and render them
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    tasks = savedTasks;
    for (let task of tasks) {
      renderTask(task);
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const task = input.value;

    if (!task) {
      alert("Please add a task");
      return;
    }

    // Add task to the task list and save to LocalStorage
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Render the task in the task list
    renderTask(task);

    input.value = "";
  });

  function renderTask(task) {
    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");
    // task_content_el.innerText = task;

    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement("input");

    // task_input_el= "text"
    task_input_el.classList.add("text");
    task_input_el.value = task;
    task_input_el.setAttribute("readonly", "readonly");

    task_content_el.appendChild(task_input_el);

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerText = "EDIT";

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerText = "DELETE";

    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);

    listEl.appendChild(task_el);

    task_edit_el.addEventListener("click", function () {
      if (task_edit_el.innerText.toLowerCase() == "edit") {
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
        task_edit_el.innerText = "SAVE";
      } else {
        // task_input_el.setAttribute("readonly", "readonly");
        task_edit_el.innerText = "EDIT";

        // Update the task in the task list and save to LocalStorage
        const index = tasks.indexOf(task);
        tasks[index] = task_input_el.value;
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    });

    task_delete_el.addEventListener("click", function () {
      // Remove the task from the task list and save to LocalStorage
      const index = tasks.indexOf(task);
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      listEl.removeChild(task_el);
    });
  }
});
