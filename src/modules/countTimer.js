const countTimer = (deadline) => {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');
    
    function getTimeRemaining() {
        const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
        return { timeRemaining, hours, minutes, seconds };
    }
    
    function updateClock() {
        const timer = getTimeRemaining();

        timerHours.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSeconds.textContent = timer.seconds;

        if (timer.hours < 10) {
            timerHours.textContent = '0' + timer.hours;
        }
        if (timer.minutes < 10) {
            timerMinutes.textContent = '0' + timer.minutes;
        }
        if (timer.seconds < 10) {
            timerSeconds.textContent = '0' + timer.seconds;
        }
        if (timer.timeRemaining > 0) {
            setTimeout(updateClock, 1000);
        }
    }

    if (getTimeRemaining().timeRemaining > 0) {
        updateClock();
        setInterval(updateClock, 1000);
    } else {
        clearInterval(2);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
    }
};

export default countTimer;