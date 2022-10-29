const username = window.location.href.split("?")[1];

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
});
console.log(results);
