let sound = "click_sound";

document
    .getElementById("buttonThatMakesASound")
    .addEventListener("click", () => {
        const audio = new Audio(`./resources/${sound}.mp3`);
        audio.volume = 0.5; // Set volume to 50%
        audio.play();
    });

document
    .getElementById("dnuoSAsekaMtahTnottub")
    .addEventListener("click", () => {
        const reversedName = sound.split("").reverse().join("");
        const audio = new Audio(`./resources/${reversedName}.mp3`);
        audio.volume = 0.5; // Set volume to 50%
        audio.play();
    });

const nothingButton = document.getElementById("nothing-button");

// first click changes the text
nothingButton.onclick = () => {
    nothingButton.innerHTML += "?";

    // all other clicks only change the sound
    const nextClicks = () => {
        sound = sound === "click_sound" ? "click2_sound" : "click_sound";
    };

    nextClicks();

    nothingButton.onclick = nextClicks;
};