document
    .getElementById("buttonThatMakesASound")
    .addEventListener("click", () => {
        const audio = new Audio("./resources/click_sound.m4a");
        audio.volume = 0.5; // Set volume to 50%
        console.log("Button clicked, playing sound");
        audio.play();
    });
