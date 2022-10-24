console.log("connected");
const button = document.querySelector(".btn");
const urlExercises = "http://localhost:3001/api/exercisesData";
const urlMuscles = "http://localhost:3001/api/exercisesData";

const getData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

button.addEventListener("click", () => {
  console.log("fetching");
  getData(urlExercises);
});

const getMuscleData = (url) => {
  getData(url);
};
