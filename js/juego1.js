const colores = [

    {
        id:"red",
        nombre:"ROJO - RED"
    },

    {
        id:"blue",
        nombre:"AZUL - BLUE"
    },

    {
        id:"green",
        nombre:"VERDE - GREEN"
    },

    {
        id:"yellow",
        nombre:"AMARILLO - YELLOW"
    },

    {
        id:"purple",
        nombre:"MORADO - PURPLE"
    }

];

let colorActual;

let correctas = 0;

let errores = 0;

const indicacion =
document.getElementById("indicacion");

const zonaCorrecta =
document.getElementById("zonaCorrecta");

const mensaje =
document.getElementById("mensaje");

const audioCorrecto =
document.getElementById("audioCorrecto");

const audioIncorrecto =
document.getElementById("audioIncorrecto");

const audioLogro =
document.getElementById("audioLogro");

function iniciarJuego(){

    const aleatorio =
    Math.floor(Math.random() * colores.length);

    colorActual = colores[aleatorio];

    indicacion.innerHTML =
    `Arrastra el color:<br>${colorActual.nombre}`;

    hablar(colorActual.nombre);

    mensaje.innerHTML = "";

    zonaCorrecta.classList.remove("correcto");

    zonaCorrecta.classList.remove("incorrecto");
}

iniciarJuego();

function hablar(texto){

    const voz =
    new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";

    speechSynthesis.speak(voz);
}

document
.getElementById("btnRepetir")
.addEventListener("click", ()=>{

    hablar(colorActual.nombre);

});

const elementos =
document.querySelectorAll(".arrastrable");

elementos.forEach(elemento=>{

    elemento.addEventListener("dragstart",(e)=>{

        e.dataTransfer.setData(
            "text",
            elemento.id
        );

    });

});

zonaCorrecta.addEventListener(
    "dragover",
    (e)=>{

        e.preventDefault();

    }
);

zonaCorrecta.addEventListener(
    "drop",
    (e)=>{

        e.preventDefault();

        const dato =
        e.dataTransfer.getData("text");

        validarRespuesta(dato);

    }
);

function validarRespuesta(id){

    if(id === colorActual.id){

        audioCorrecto.play();

        zonaCorrecta.classList.add("correcto");

        mensaje.innerHTML =
        "🎉 ¡CORRECTO! 🎉";

        crearEstrellas();

        correctas++;

        if(correctas >= 5){

            audioLogro.play();

            mensaje.innerHTML =
            "🏆 ¡FELICITACIONES! 🏆";

            crearConfetiFinal();
        }

        setTimeout(()=>{

            iniciarJuego();

        },2000);

    }else{

        errores++;

        audioIncorrecto.play();

        zonaCorrecta.classList.add("incorrecto");

        mensaje.innerHTML =
        "❌ Inténtalo nuevamente ❌";

        setTimeout(()=>{

            zonaCorrecta.classList.remove(
            "incorrecto");

        },1000);

        if(errores >= 5){

            alert(
            "Debes comenzar nuevamente 😄"
            );

            errores = 0;

            correctas = 0;

            iniciarJuego();
        }

    }

}

document
.getElementById("btnReiniciar")
.addEventListener("click", ()=>{

    errores = 0;

    correctas = 0;

    iniciarJuego();

});

function crearEstrellas(){

    const contenedor =
    document.getElementById("estrellas");

    const estrella =
    document.createElement("img");

    estrella.src =
    "../img/estrella.png";

    estrella.classList.add("estrella");

    contenedor.appendChild(estrella);

    setTimeout(()=>{

        estrella.remove();

    },3000);

    crearConfeti();
}

function crearConfeti(){

    for(let i=0; i<30; i++){

        const confeti =
        document.createElement("div");

        confeti.classList.add("confeti");

        confeti.style.left =
        Math.random() * window.innerWidth + "px";

        confeti.style.backgroundColor =
        `hsl(${Math.random()*360},
        100%,50%)`;

        document.body.appendChild(confeti);

        setTimeout(()=>{

            confeti.remove();

        },4000);

    }

}

function crearConfetiFinal(){

    for(let i=0; i<80; i++){

        const confeti =
        document.createElement("div");

        confeti.classList.add("confeti");

        confeti.style.left =
        Math.random() * window.innerWidth + "px";

        confeti.style.backgroundColor =
        `hsl(${Math.random()*360},
        100%,50%)`;

        document.body.appendChild(confeti);

        setTimeout(()=>{

            confeti.remove();

        },5000);

    }

}