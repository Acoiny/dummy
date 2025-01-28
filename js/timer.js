const title = document.getElementById('title');
const timer = document.getElementById('timer');

const eventTime =
{
    time: new Date('2025-1-27 18:00:00'),
    _title: 'Evening Party',
    get title() {
        return this._title;
    },
    set title(value) {
        this._title = value;
        title.innerHTML = value;
    }
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

title.innerHTML = eventTime.title;

updateTimer();
setInterval(updateTimer, 1000);

// custom submit function for the form
document.getElementById('timer-form').onsubmit = (e) => {
    e.preventDefault();
    const days = Number(document.getElementById('days').value);
    const hours = Number(document.getElementById('hours').value);
    const minutes = Number(document.getElementById('minutes').value);
    const seconds = Number(document.getElementById('seconds').value);

    const title = document.getElementById('formTitle').value || "Event";

    console.log("Form submitted");
    console.log({title, days, hours, minutes, seconds});
    addTimer(days, hours, minutes, seconds, title);
};

// close the form, by hiding it
window.closeForm = () => {
    document.getElementById('timer-form').style.display = 'none';
    document.getElementById('closeFormButton').style.display = 'block';
};

window.openForm = () => {
    document.getElementById('timer-form').style.display = 'block';
    document.getElementById('closeFormButton').style.display = 'none';
};

closeForm();

function addTimer(days, hours, minutes, seconds, title = "Event") {
    eventTime.time = new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000);
    eventTime.title = title;
    updateTimer();
};