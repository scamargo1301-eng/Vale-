/* =========================================
   ESCENAS
========================================= */

const scenes = document.querySelectorAll(".scene");

const startButton =
    document.getElementById("startButton");

const nextButtons =
    document.querySelectorAll(".next-button");

const restartButton =
    document.getElementById("restartButton");


let currentScene = 0;


/* =========================================
   MÚSICA
========================================= */

const music =
    document.getElementById("music");

const musicButton =
    document.getElementById("musicButton");

const musicText =
    document.getElementById("musicText");

let musicPlaying = false;


/* =========================================
   CAMBIAR ESCENA
========================================= */

function changeScene(number) {

    if (
        number < 0 ||
        number >= scenes.length
    ) {

        return;

    }


    scenes[currentScene]
        .classList
        .remove("active");


    currentScene = number;


    setTimeout(() => {

        scenes[currentScene]
            .classList
            .add("active");

    }, 100);

}


/* =========================================
   COMENZAR
========================================= */

startButton.addEventListener(
    "click",
    () => {

        changeScene(1);

        startMusic();

    }
);


/* =========================================
   BOTONES SIGUIENTES
========================================= */

nextButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const nextScene =
                parseInt(
                    button.dataset.next
                );


            changeScene(nextScene);

        }
    );

});


/* =========================================
   VOLVER AL PRINCIPIO
========================================= */

restartButton.addEventListener(
    "click",
    () => {

        changeScene(0);

    }
);


/* =========================================
   MÚSICA
========================================= */

function startMusic() {

    if (musicPlaying) {

        return;

    }


    music.volume = 0.35;


    music.play()
        .then(() => {

            musicPlaying = true;

            musicText.textContent =
                "Pausar";

        })
        .catch(() => {

            console.log(
                "El navegador bloqueó el audio."
            );

        });

}


/* =========================================
   BOTÓN DE MÚSICA
========================================= */

musicButton.addEventListener(
    "click",
    () => {

        if (music.paused) {

            music.play();

            musicPlaying = true;

            musicText.textContent =
                "Pausar";

        }

        else {

            music.pause();

            musicPlaying = false;

            musicText.textContent =
                "Déjala sonar 😡";

        }

    }
);


/* =========================================
   CONTADOR
========================================= */


/*
    ========================================
    CAMBIA ESTA FECHA
    ========================================

    EJEMPLO:

    14 de febrero de 2026
    sería:

    const FECHA_INICIO =
        new Date("2026-02-14T00:00:00");

*/


const FECHA_INICIO =
    new Date("2026-08-28T21:31:00");


/* =========================================
   ELEMENTOS DEL CONTADOR
========================================= */

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");


/* =========================================
   ACTUALIZAR CONTADOR
========================================= */

function updateCounter() {

    const now =
        new Date();


    let difference =
        now.getTime() -
        FECHA_INICIO.getTime();


    if (difference < 0) {

        difference = 0;

    }


    const totalSeconds =
        Math.floor(
            difference / 1000
        );


    const days =
        Math.floor(
            totalSeconds / 86400
        );


    const hours =
        Math.floor(
            (totalSeconds % 86400) /
            3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) /
            60
        );


    const seconds =
        totalSeconds % 60;


    daysElement.textContent =
        days;


    hoursElement.textContent =
        String(hours)
            .padStart(2, "0");


    minutesElement.textContent =
        String(minutes)
            .padStart(2, "0");


    secondsElement.textContent =
        String(seconds)
            .padStart(2, "0");

}


/* =========================================
   INICIAR CONTADOR
========================================= */

updateCounter();


setInterval(
    updateCounter,
    1000
);


/* =========================================
   TECLADO
========================================= */

document.addEventListener(
    "keydown",
    (event) => {


        if (
            event.key === "ArrowRight"
        ) {

            if (
                currentScene <
                scenes.length - 1
            ) {

                changeScene(
                    currentScene + 1
                );

            }

        }


        if (
            event.key === "ArrowLeft"
        ) {

            if (
                currentScene > 0
            ) {

                changeScene(
                    currentScene - 1
                );

            }

        }

    }
);


/* =========================================
   SWIPE CELULAR
========================================= */

let touchStartX = 0;

let touchEndX = 0;


document.addEventListener(
    "touchstart",
    (event) => {

        touchStartX =
            event.changedTouches[0]
                .screenX;

    }
);


document.addEventListener(
    "touchend",
    (event) => {

        touchEndX =
            event.changedTouches[0]
                .screenX;


        const distance =
            touchEndX -
            touchStartX;


        if (
            Math.abs(distance) < 50
        ) {

            return;

        }


        if (distance < 0) {

            if (
                currentScene <
                scenes.length - 1
            ) {

                changeScene(
                    currentScene + 1
                );

            }

        }

        else {

            if (
                currentScene > 0
            ) {

                changeScene(
                    currentScene - 1
                );

            }

        }

    }
);


/* =========================================
   ESCENA INICIAL
========================================= */

scenes[0]
    .classList
    .add("active");