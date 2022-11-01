const username = window.location.href.split("?")[1];
const workoutList = document.querySelector("#workoutList");

async function getExercicesData() {
  const response = await fetch(
    `http://localhost:3001/api/customWorkout/${username}`
  );
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

// Timer
document.getElementById("timer").exercisesData = 01 + ":" + 11;
startTimer();

function startTimer() {
  var presentTime = document.getElementById("timer").exercisesData;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond(timeArray[1] - 1);
  if (s == 59) {
    m = m - 1;
  }
  if (m < 0) {
    return;
  }

  document.getElementById("timer").ExercisesData = m + ":" + s;
  console.log(m);
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {
    sec = "0" + sec;
  } // add zero in front of numbers < 10
  if (sec < 0) {
    sec = "59";
  }
  return sec;
}
