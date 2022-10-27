let delete_btn = [];
const addBtn = document.querySelectorAll(".add");

const list = document.querySelector(".list");
const total_duration = document.querySelector(".total_duration");

let created_list_items = [];
addBtn.forEach((el) =>
  el.addEventListener("click", (e) => {
    console.log(created_list_items);
    const text = e.target.dataset.name;
    const duration = parseInt(e.target.dataset.duration);
    const rest = parseInt(e.target.dataset.rest_time);
    const exercise_id = parseInt(e.target.dataset.exercise_id);
    const listItem = e.target.parentNode.parentNode;
    const exist = created_list_items.filter((el) => el.text == text);
    if (!exist.length) {
      created_list_items.push({ exercise_id, text, duration, rest });
    }

    if (e.target.classList.contains("fa-circle-plus")) {
      list.innerHTML = "";
      created_list_items.forEach((el, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${index + 1}. ${el.text} - Duration: ${Math.round(
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
      created_list_items = created_list_items.filter((el) => el.text !== text);
      created_list_items.forEach((el, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${index + 1}. ${el.text} - Duration: ${Math.round(
          Math.floor((el.duration + el.rest) / 60),
          1
        )}min ${(el.duration + el.rest) % 60}s`;
        list.append(li);
      });
      listItem.classList.remove("active");
      e.target.classList.add("fa-circle-plus");
      e.target.classList.remove("fa-circle-minus");
    }
    const sum_duration = created_list_items.reduce((acc, currentValue) => {
      return acc + currentValue.duration;
    }, 0);
    const total_rest = created_list_items.reduce((acc, currentValue) => {
      return acc + currentValue.rest;
    }, 0);
    const total_time = sum_duration + total_rest;
    total_duration.innerHTML = `Duration: ${Math.floor(total_time / 60)} min ${
      total_time % 60
    }s`;
  })
);
