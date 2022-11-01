let delete_btn = [];
let total_time = 0;
let total_calories = 0;

const addBtn = document.querySelectorAll("i");

const list = document.querySelector(".list");
const total_duration = document.querySelector(".total_duration");
let workroutTitle = document.querySelector("#workoutName");

let created_list_items = [];
addBtn.forEach((el) =>
  el.addEventListener("click", (e) => {
    const exercise_name = e.target.dataset.name;
    const duration = parseInt(e.target.dataset.duration);
    const username = list.getAttribute("data-value");
    const description = e.target.dataset.description;
    const rest = parseInt(e.target.dataset.rest_time);
    const calories = parseInt(e.target.dataset.calories);
    const exercise_id = parseInt(e.target.dataset.exercise_id);
    const listItem = e.target.parentNode;
    const exist = created_list_items.filter(
      (el) => el.exercise_name == exercise_name
    );
    if (!exist.length) {
      created_list_items.push({
        workout_id: "",
        exercise_id,
        username,
        description,
        exercise_name,
        duration,
        rest,
        calories,
        total_time,
      });
    }

    if (e.target.classList.contains("fa-circle-plus")) {
      list.innerHTML = "";
      created_list_items.forEach((el, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${index + 1}. ${
          el.exercise_name
        } | Duration: ${Math.round(
          Math.floor((el.duration + el.rest) / 60),
          0
        )}min ${(el.duration + el.rest) % 60}s`;
        list.append(li);
      });

      e.target.classList.remove("fa-circle-plus");
      e.target.classList.add("fa-circle-minus");
      listItem.classList.add("active");
    } else if (e.target.classList.contains("fa-circle-minus")) {
      list.innerHTML = "";
      created_list_items = created_list_items.filter(
        (el) => el.exercise_name !== exercise_name
      );
      created_list_items.forEach((el, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${index + 1}. ${
          el.exercise_name
        } | Duration: ${Math.round(
          Math.floor((el.duration + el.rest) / 60),
          0
        )}min ${(el.duration + el.rest) % 60}s`;

        list.append(li);
      });
      listItem.classList.remove("active");
      e.target.classList.add("fa-circle-plus");
      e.target.classList.remove("fa-circle-minus");
    }
    total_calories = created_list_items.reduce((acc, currentValue) => {
      return acc + currentValue.calories;
    }, 0);
    const sum_duration = created_list_items.reduce((acc, currentValue) => {
      return acc + currentValue.duration;
    }, 0);
    const total_rest = created_list_items.reduce((acc, currentValue) => {
      return acc + currentValue.rest;
    }, 0);
    total_time = sum_duration + total_rest;
    total_duration.innerHTML = `Duration: ${Math.floor(total_time / 60)} min ${
      total_time % 60
    }s`;
  })
);

const saveWorkout = document.querySelector("#saveWorkout");
saveWorkout.addEventListener("click", () => {
  list.innerHTML = "";
  total_duration.innerHTML = "Duration: 0s";
  document
    .querySelectorAll(".exercise-item")
    .forEach((el) => el.classList.remove("active"));
  document.querySelectorAll(".add i").forEach((el) => {
    el.classList.remove("fa-circle-minus");
    el.classList.add("fa-circle-plus");
  });
  let workroutName = workroutTitle.value;

  created_list_items = created_list_items.map((el) => {
    el.workout_id = workroutName;
    el.total_time = `${Math.floor(total_time / 60)} min ${total_time % 60}`;
    el.total_calories = total_calories;
    return el;
  });
  console.log(created_list_items);
  workroutTitle.value = "";
  total_calories = 0;
  total_time = 0;

  return fetch("/api/customWorkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(created_list_items),
  }).then((response) => {
    created_list_items = [];
    const fullbody_style = document.querySelectorAll("svg g g");
    fullbody_style.forEach((el) => (el.style.fill = "black"));
  });
});

const all_muscleGroups = document.querySelectorAll("svg g g");
all_muscleGroups.forEach((el) =>
  el.addEventListener("click", (e) => {
    console.log(e.target.parentNode);
    e.target.parentNode.style.fill = "red";
  })
);

addBtn.forEach((el) =>
  el.addEventListener("click", (e) => {
    const listItem = e.target.parentNode.parentNode;

    let selected;
    console.log(e.target.dataset.muscle);

    if (
      e.target.dataset.muscle == "Full body" &&
      listItem.classList.contains("active")
    ) {
      const fullbody_style = document.querySelectorAll("svg g g");
      fullbody_style.forEach((el) => (el.style.fill = "red"));
    } else {
      const selected = document.querySelectorAll(`#${e.target.dataset.muscle}`);
      selected.forEach((el) => (el.style.fill = "red"));
    }

    // selected.style.fill = "red";
  })
);
