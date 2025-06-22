const titleElement = document.getElementById('title');
const timer = document.getElementById('timer');

const eventTime =
{
    time: new Date('2025-1-27 18:00:00'),
    title: 'Evening Party',
}

// check if localstorage has a timer
const storedTimer = localStorage.getItem('timer');
if (storedTimer) {
    const timer = JSON.parse(storedTimer);
    eventTime.time = new Date(timer.time);
    eventTime.title = timer.title;
}

function updateTimer() {
    const remainingTime = new Date(eventTime.time - new Date());

    if (remainingTime.getTime() <= 0) {
        timer.innerHTML = '00:00:00:00';
        return;
    }

    let days = String(Math.floor(remainingTime.getTime() / (1000 * 60 * 60 * 24)));
    if (days.length < 2) days = `0${days}`;

    let hours = String(remainingTime.getUTCHours());
    if (hours.length < 2) hours = `0${hours}`;

    let minutes = String(remainingTime.getUTCMinutes());
    if (minutes.length < 2) minutes = `0${minutes}`;

    let seconds = String(remainingTime.getUTCSeconds());
    if (seconds.length < 2) seconds = `0${seconds}`;

    timer.innerHTML = `${days}:${hours}:${minutes}:${seconds}`;
}

titleElement.innerHTML = eventTime.title;

updateTimer();
setInterval(updateTimer, 1000);

// custom submit function for the form
document.getElementById('timer-form').onsubmit = (e) => {
    e.preventDefault();

    const date = document.getElementById('formDate').value;
    const time = document.getElementById('formTime').value;

    const title = document.getElementById('formTitle').value || "Event";

    const res = new Date(`${date} ${time}`);

    console.log("Form submitted");
    console.log(res);
    addTimer(res, title);

    window.closeForm();
};

// close the form, by hiding it
window.closeForm = () => {
    document.getElementById('timer-form').style.display = 'none';
    document.getElementById('openFormButton').style.display = 'block';
};

window.openForm = () => {
    document.getElementById('timer-form').style.display = 'block';
    document.getElementById('openFormButton').style.display = 'none';

    document.getElementById('formDate').value = eventTime.time.toISOString().split('T')[0];
    document.getElementById('formTime').value = eventTime.time.toTimeString().split(' ')[0];
    document.getElementById('formTitle').value = eventTime.title || '';
};

closeForm();

function addTimer(date, title) {
    eventTime.time = date;
    eventTime.title = title;
    titleElement.innerHTML = title;

    const str = JSON.stringify(eventTime);
    
    localStorage.setItem('timer', str);

    updateTimer();
};