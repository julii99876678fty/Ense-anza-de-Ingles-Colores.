/* VOZ */

function hablar(texto){

    speechSynthesis.cancel();

    const voz =
    new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";

    voz.rate = 0.9;

    speechSynthesis.speak(voz);
}

hablar(
"Felicitaciones. Completaste el juego de colores. Eres un campeón."
);

/* ESTRELLAS */

function crearEstrellas(){

    for(let i=0; i<100; i++){

        const estrella =
        document.createElement("div");

        estrella.classList.add(
        "estrella"
        );

        estrella.innerHTML =
        "🌟";

        estrella.style.left =
        Math.random() *
        window.innerWidth + "px";

        estrella.style.top =
        Math.random() *
        window.innerHeight + "px";

        document.body.appendChild(
        estrella
        );

        setTimeout(()=>{

            estrella.remove();

        },4000);

    }

}

/* CONFETI */

function crearConfeti(){

    for(let i=0; i<200; i++){

        const confeti =
        document.createElement("div");

        confeti.classList.add(
        "confeti"
        );

        confeti.style.left =
        Math.random() *
        window.innerWidth + "px";

        confeti.style.backgroundColor =
        `hsl(${Math.random()*360},
        100%,50%)`;

        document.body.appendChild(
        confeti
        );

        setTimeout(()=>{

            confeti.remove();

        },5000);

    }

}

crearEstrellas();

crearConfeti();