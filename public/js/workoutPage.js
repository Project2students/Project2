var pomodoroLengthMins = 25; // initial pomodoro length in mins  
var origPomodoroLengthMins = pomodoroLengthMins; // copy to a new variable for later use  
var pomodoroLengthSecs = (pomodoroLengthMins * 60) % 60; // initial pomodoro secs value  
var pomodoroTotal = pomodoroLengthMins * 60; // total pomodoro length in secs  
if (pomodoroLengthSecs < 10) {  
 pomodoroLengthSecs = "0" + pomodoroLengthSecs; // output 0 secs as 00  
}  
var breakLengthMins = 5; // initial break length in mins  
var origBreakLengthMins = breakLengthMins; // copy to a new variable for later use  
var breakLengthSecs = (breakLengthMins * 60) % 60; // initial break secs value  
var breakTotal = breakLengthMins * 60; // total break length in secs  
if (breakLengthSecs < 10) {  
 breakLengthSecs = "0" + breakLengthSecs; // output 0 secs as 00  
}  
var interval; // declare variable for use in the setInterval function  
// display initial values of the timers on the page  
document.querySelector('.pomodoro-timer').innerHTML = pomodoroLengthMins;  
document.querySelector('.break-timer').innerHTML = breakLengthMins;  
document.querySelector('.timer-main-container').innerHTML = pomodoroLengthMins + ":" + pomodoroLengthSecs;  
// decrement break timer  
function decrementBreakTimer() {  
 if (breakLengthMins > 1) {  
  breakLengthMins = breakLengthMins - 1;  
  origBreakLengthMins = breakLengthMins;  
  breakTotal = breakLengthMins * 60;  
  document.querySelector('.break-timer').innerHTML = breakLengthMins;  
 }  
}  
// increment break timer  
function incrementBreakTimer() {  
 breakLengthMins = breakLengthMins + 1;  
 origBreakLengthMins = breakLengthMins;  
 breakTotal = breakLengthMins * 60;  
 document.querySelector('.break-timer').innerHTML = breakLengthMins;  
}  
// decrement Pomodoro timer  
function decrementPomodoroTimer() {  
 if (pomodoroLengthMins > 1) {  
  pomodoroLengthMins = pomodoroLengthMins - 1;  
  origPomodoroLengthMins = pomodoroLengthMins;  
  pomodoroTotal = pomodoroLengthMins * 60;  
  document.querySelector('.pomodoro-timer').innerHTML = pomodoroLengthMins;  
  document.querySelector('.timer-main-container').innerHTML = pomodoroLengthMins + ":" + pomodoroLengthSecs;  
 }  
}  
// increment Pomodoro timer  
function incrementPomodoroTimer() {  
 pomodoroLengthMins = pomodoroLengthMins + 1;  
 origPomodoroLengthMins = pomodoroLengthMins;  
 pomodoroTotal = pomodoroLengthMins * 60;  
 document.querySelector('.pomodoro-timer').innerHTML = pomodoroLengthMins;  
 document.querySelector('.timer-main-container').innerHTML = pomodoroLengthMins + ":" + pomodoroLengthSecs;  
}  
// start button: disable changing timer settings, and start the setInterval  
function startTimer() {  
  document.querySelector('.decrementBreakTimer').disabled = 'disabled';  
  document.querySelector('.incrementBreakTimer').disabled = 'disabled';  
  document.querySelector('.decrementPomodoroTimer').disabled = 'disabled';  
  document.querySelector('.incrementPomodoroTimer').disabled = 'disabled';  
  document.querySelector('.button-start').disabled = 'disabled';  
  document.querySelector('.button-pause').disabled = '';  
  interval = setInterval(runPomodoroTimer, 1000);  
}  
function runPomodoroTimer() {  
 pomodoroTotal--; // decrement total pomodoro timer length  
 pomodoroLengthMins = pomodoroTotal / 60 | 0; // calculate mins  
 pomodoroLengthSecs = pomodoroTotal % 60; // calculate secs  
 if (pomodoroLengthSecs < 10) { // output secs as two figures  
  pomodoroLengthSecs = "0" + (pomodoroTotal % 60);  
 }  
 document.querySelector('.timer-main-container').innerHTML = pomodoroLengthMins + ":" + pomodoroLengthSecs;  
 document.querySelector('.timer-description').innerHTML = "until your break";  
 if (pomodoroTotal == -1) {  
  clearInterval(interval);  
  breakTotal = origBreakLengthMins * 60;  
  document.querySelector('.timer-main-container').innerHTML = origBreakLengthMins + ":00";  
  document.querySelector('.timer-description').innerHTML = "It's break time!";  
  interval = setInterval(runBreakTimer, 1000);  
 }  
}  
function runBreakTimer() {  
 breakTotal--; // decrement counter  
 breakLengthMins = breakTotal / 60 | 0; // calculate mins  
 breakLengthSecs = breakTotal % 60; // calculate secs  
 if (breakLengthSecs < 10) { // output secs as two figures  
  breakLengthSecs = "0" + (breakTotal % 60);  
 }  
 document.querySelector('.timer-main-container').innerHTML = breakLengthMins + ":" + breakLengthSecs;  
 if (breakTotal == -1) {  
  breakTotal--;  
  clearInterval(interval);  
  pomodoroTotal = origPomodoroLengthMins * 60;  
  document.querySelector('.timer-main-container').innerHTML = origPomodoroLengthMins + ":00";  
  document.querySelector('.timer-description').innerHTML = "until your break";  
  interval = setInterval(runPomodoroTimer, 1000);  
 }  
}  
function pauseTimer() {  
  clearInterval(interval);  
  document.querySelector('.button-pause').disabled = 'disabled';  
  document.querySelector('.button-start').disabled = '';  
}  
function resetTimer() {  
 document.querySelector('.decrementBreakTimer').disabled = '';  
 document.querySelector('.incrementBreakTimer').disabled = '';  
 document.querySelector('.decrementPomodoroTimer').disabled = '';  
 document.querySelector('.incrementPomodoroTimer').disabled = '';  
 document.querySelector('.button-start').disabled = '';  
 document.querySelector('.button-pause').disabled = '';  
 clearInterval(interval);  
 pomodoroLengthMins = 25;  
 pomodoroLengthSecs = "0" + 10;  
 pomodoroTotal = pomodoroLengthMins * 60;  
 breakLengthMins = 5;  
 breakLengthSecs = "0" + 0;  
 breakTotal = breakLengthMins * 60;  
 document.querySelector('.pomodoro-timer').innerHTML = pomodoroLengthMins;  
 document.querySelector('.break-timer').innerHTML = breakLengthMins;  
 document.querySelector('.timer-main-container').innerHTML = pomodoroLengthMins + ":" + pomodoroLengthSecs;  
 document.querySelector('.timer-description').innerHTML = "Ready to work?";  
}  