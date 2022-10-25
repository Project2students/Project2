const urlUsers = "http://localhost:3001/api/user-routes";


const getData = (url) => {
    return fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data));
  };

  const getUserData = (url) => {
    getData(url);
  };