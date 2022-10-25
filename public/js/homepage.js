const button = document.querySelector(".btn");
const urlExercises = "http://localhost:3001/api/exercisesData";
const urlMuscles = "http://localhost:3001/api/exercisesData";

const getData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

const getMuscleData = (url) => {
  getData(url);
};

const addBtn = document.querySelectorAll(".add");
const list = document.querySelector(".list");
const total_duration = document.querySelector(".total_duration");

let created_list_items = [];
addBtn.forEach((el) =>
  el.addEventListener("click", (e) => {
    const text = e.target.dataset.name;
    const duration = parseInt(e.target.dataset.duration);
    const rest = parseInt(e.target.dataset.rest_time);
    const exist = created_list_items.filter((el) => el.text == text);
    const exercise_id = parseInt(e.target.dataset.exercise_id);
    if (!exist.length) {
      created_list_items.push({ exercise_id, text, duration, rest });
      const list_button = document.createElement("button");
      const list_item = document.createElement("li");
      list_button.classList.add("delete_btn");
      list_button.innerHTML = `<i class="fa-solid fa-xmark fa-1x" id=${exercise_id}></i>`;
      list_item.innerHTML = `${created_list_items.length}. ${text}`;
      list_item.classList.add("workout_list_item");
      list_item.append(list_button);
      list.append(list_item);

      const sum_duration = created_list_items.reduce((acc, currentValue) => {
        return acc + currentValue.duration;
      }, 0);
      const total_rest = created_list_items.reduce((acc, currentValue) => {
        return acc + currentValue.rest;
      }, 0);
      const total_time = sum_duration + total_rest;
      total_duration.innerHTML = `Duration: ${Math.floor(
        total_time / 60
      )} min ${total_time % 60}s`;
    }
  })
);
