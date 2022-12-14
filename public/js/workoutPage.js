const username = window.location.href.split("?")[1];
const workoutList = document.querySelector("#workoutList");

async function getExercicesData() {
  const response = await fetch(`/api/customWorkout/${username}`);
  const exercisesData = await response.json();
  return exercisesData;
}

const results = [];
getExercicesData().then((data) => {
  const wokroutId = [...new Set(data.map((el) => el.workout_id))];
  for (let i = 0; i < wokroutId.length; i++) {
    const workouts = data.filter((el) => el.workout_id == wokroutId[i]);
    results.push(workouts);
  }
  console.log("results:" + results);
});

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timerRef = document.querySelector(".timerDisplay");
let int = null;

document.getElementById("start").addEventListener("click", () => {
  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(displayTimer, 10);
});

document.getElementById("pause").addEventListener("click", () => {
  clearInterval(int);
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(int);
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];

  timerRef.innerHTML = "00 : 00 : 000 ";

});

document.querySelectorAll(".deleteWorkout").forEach((el) =>
  el.addEventListener("click", (e) => {
    const item = { data: e.target.id };
    e.target.parentNode.parentNode.remove();
    return fetch("/api/customWorkout", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(item),
    });
  })
);

function displayTimer() {
  milliseconds += 10;
  if (milliseconds == 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
      if (minutes == 60) {
        minutes = 0;
        hours++;
      }
    }
  }

  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms =
    milliseconds < 10
      ? "00" + milliseconds
      : milliseconds < 100
      ? "0" + milliseconds
      : milliseconds;

  timerRef.innerHTML = `${m} : ${s} : ${ms}`;
}
