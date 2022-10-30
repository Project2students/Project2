const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  
  const username = document.querySelector('#username-signup').value.trim();
  const first_name = document.querySelector('#firstName-signup').value.trim();
  const last_name = document.querySelector('#lastName-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const weight = document.querySelector('#weight-signup').value.trim();
  const height = document.querySelector('#height-signup').value.trim();
  const age = document.querySelector('#age-signup').value.trim();
  console.log(username, first_name, last_name, email, password, weight, height, age)

  if (username && first_name && last_name && email && password && weight && height && age) {
    console.log("validated")
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, first_name, last_name, email, password, weight, height, age }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

var loginForm = document.querySelector('.login-form')
loginForm.addEventListener('submit', loginFormHandler); 

var signUpForm = document.querySelector('.signup-form')
signUpForm.addEventListener('submit', signupFormHandler);

document
  .querySelector('#signup-btn')
  .addEventListener('click', () => {
    loginForm.style.display = 'none'
    signUpForm.style.display = 'inline-flex'
  })

