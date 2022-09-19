import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// import "notiflix/dist/notiflix-3.2.5.min.css";
// import { Notify } from "notiflix/build/notiflix-notify-aio";

// const MLS_PER_SECOND = 1000;
// const refs = {
//   input: document.querySelector("#datetime-picker"),
//   btn: document.querySelector("button[data-start]"),
//   timer: {
//     container: document.querySelector(".timer"),
//     days: document.querySelector("[data-days]"),
//     hours: document.querySelector("[data-hours]"),
//     minutes: document.querySelector("[data-minutes]"),
//     seconds: document.querySelector("[data-seconds]"),
//   },
// };
// let isBtnDisabled = null;
// let intervalId = null;
// let currentTime = null;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     onCloseFlatPicker(selectedDates);
//   },
// };

// setBtnDisabled(true);
// flatpickr(refs.input, options);
// refs.btn.addEventListener("click", onClickStartBtn);

// function onClickStartBtn() {
//   setBtnDisabled(true);
//   startTimer(currentTime);
// }

// function onCloseFlatPicker(selectedDates) {
//   const diffTime = selectedDates[0].getTime() - Date.now();
//   const isFuture = diffTime > 0;

//   if (isFuture) {
//     currentTime = diffTime;
//     setBtnDisabled(false);
//   } else {
//     currentTime = 0;
//     setBtnDisabled(true);
//     Notify.failure("Please choose a date in the future", {
//       position: "center-top",
//       clickToClose: true,
//       timeout: 10000,
//     });
//   }
// }

// function startTimer(ms) {
//   currentTime = ms;
//   updateTimer(ms);
//   intervalId = setInterval(() => {
//     const isFinish = ticTimer();

//     if (isFinish) clearInterval(intervalId);
//   }, MLS_PER_SECOND);
// }

// function ticTimer() {
//   currentTime -= MLS_PER_SECOND;
//   if (currentTime <= 0) return true;
//   updateTimer(currentTime);
//   return false;
// }

// function updateTimer(ms) {
//   currentTime = ms;
//   updateTimerElements(convertMs(ms));
// }

// function updateTimerElements({ days, hours, minutes, seconds }) {
//   refs.timer.days.textContent = addLeadingZero(days);
//   refs.timer.hours.textContent = addLeadingZero(hours);
//   refs.timer.minutes.textContent = addLeadingZero(minutes);
//   refs.timer.seconds.textContent = addLeadingZero(seconds);
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, "0");
// }

// function setBtnDisabled(flag) {
//   isBtnDisabled = flag;
//   refs.btn.disabled = flag;
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      refs.startBtn.setAttribute("disabled", true);
      window.alert("Please choose a date in the future");
    }
    refs.startBtn.removeAttribute("disabled");

    refs.inputData.setAttribute("disabled", true);
    refs.startBtn.addEventListener("click", () => {
      function timer() {
        let currentData = new Date();
        const dataTime = selectedDates[0] - currentData;
        if (dataTime < 0) {
          return;
        }

        let time = getTimeComponents(dataTime);

        console.log(time);

        updateClockFace(time);
      }
      setInterval(timer, 1000);

      //  refs.startBtn.setAttribute('disabled', true);
      //  refs.startBtn.removeAttribute('disabled');
    });
  },
};

flatpickr("#datetime-picker", options);

const refs = {
  startBtn: document.querySelector("button[data-start]"),
  day: document.querySelector("[data-days]"),
  hour: document.querySelector("[data-hours]"),
  minute: document.querySelector("[data-minutes]"),
  second: document.querySelector("[data-seconds]"),
  inputData: document.querySelector("#datetime-picker"),
};

//  class Timer {
//     constructor({onTick}) {
//         // this.intervalId = null;
//         // this.isActive = false;
//         this.onTick = onTick;
//     }
//     start() {

//         if (this.isActive) {
//             return;
//         }

//      const startTime = Date.parse(refs.inputData.value);
//         // this.isActive = true;
//     setInterval(() => {

//         const timeTimer = Date.parse(refs.inputData.value);
//         const deltaTime = timeTimer - startTime;
//         const time = getTimeComponents(deltaTime);

//             // updateClockFace(time)
//           this.onTick(time)

//         }, 1000);
//         // refs.startBtn.removeAttribute('disabled');

//     }

// }
// const timer = new Timer({
//     onTick: updateClockFace,
// });
// function updateClockFace({ days, hours, minutes, seconds }) {
//     refs.inputData.textContent=`${days}:${hours}:${minutes}:${seconds}`
// }
// console.log(updateClockFace)
// timer.start();

function getTimeComponents(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  //ставится 00
  function pad(value) {
    return String(value).padStart(2, "0");
  }

  //математика
  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

//

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.day.textContent = `${days}`;
  refs.hour.textContent = `${hours}`;
  refs.minute.textContent = `${minutes}`;
  refs.second.textContent = `${seconds}`;
}
// =================================================================
