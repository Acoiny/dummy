document
    .getElementById("buttonThatMakesASound")
    .addEventListener("click", () => {
        const audio = new Audio("./resources/click_sound.m4a");
        audio.volume = 0.5; // Set volume to 50%
        audio.play();
    });

document
    .getElementById("dnuoSAsekaMtahTnottub")
    .addEventListener("click", () => {
        const audio = new Audio("./resources/dnuos_kcilc.mp3");
        audio.volume = 0.5; // Set volume to 50%
        audio.play();
    });
