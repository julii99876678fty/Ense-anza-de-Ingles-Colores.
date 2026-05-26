const colores = [

    {
        id:"red",
        ingles:"RED",
        imagen:"../img/rojo.png"
    },

    {
        id:"blue",
        ingles:"BLUE",
        imagen:"../img/azul.png"
    },

    {
        id:"green",
        ingles:"GREEN",
        imagen:"../img/verde.png"
    },

    {
        id:"yellow",
        ingles:"YELLOW",
        imagen:"../img/amarillo.png"
    },

    {
        id:"purple",
        ingles:"PURPLE",
        imagen:"../img/morado.png"
    }

];

/* LISTAS */

let pendientes = [...colores];

let incorrectos = [];

/* VARIABLES */

let colorActual;

let correctas = 0;

let errores = 0;

let puntaje = 0;

/* ELEMENTOS */

const imagen =
document.getElementById("imagenColor");

const mensaje =
document.getElementById("mensaje");

const textoCorrectas =
document.getElementById("correctas");

const textoErrores =
document.getElementById("errores");

const textoPuntaje =
document.getElementById("puntaje");

const audioCorrecto =
document.getElementById("audioCorrecto");

const audioIncorrecto =
document.getElementById("audioIncorrecto");

const audioLogro =
document.getElementById("audioLogro");

/* VOZ */

function hablar(texto, idioma="en-US"){

    speechSynthesis.cancel();

    const voz =
    new SpeechSynthesisUtterance(texto);

    voz.lang = idioma;

    voz.rate = 0.8;

    speechSynthesis.speak(voz);
}

/* INTRO */

window.onload = ()=>{

    const intro =
    "Bienvenido al mundo de los colores. Escucha el color en inglés y arrastra la palabra correcta hacia el globo correcto. Si te equivocas, el color volverá a aparecer después.";

    hablar(intro,"es-ES");

    iniciarJuego();

};

/* INICIAR */

function iniciarJuego(){

    if(pendientes.length === 0){

        /* SI HAY ERRORES */

        if(incorrectos.length > 0){

            pendientes = [...incorrectos];

            incorrectos = [];

            mensaje.innerHTML =
            "🔁 REPASEMOS LOS COLORES INCORRECTOS 🔁";

            mensaje.style.color =
            "yellow";

            hablar(
            "Ahora repasaremos los colores incorrectos",
            "es-ES"
            );

            setTimeout(()=>{

                siguienteColor();

            },2500);

            return;
        }

        /* SI TERMINO TODO */

        mensaje.innerHTML =
        "🏆 ¡FELICITACIONES! COMPLETASTE TODOS LOS COLORES 🏆";

        mensaje.style.color =
        "#00ff6a";

        audioLogro.play();

        hablar(
        "Congratulations. You completed all the colors.",
        "en-US"
        );

        crearEstrellasFinales();

        return;
    }

    siguienteColor();
}

/* SIGUIENTE */

function siguienteColor(){

    colorActual = pendientes[0];

    imagen.src =
    colorActual.imagen;

}

/* BOTON INSTRUCCIONES */

document
.getElementById("btnInstrucciones")
.addEventListener("click", ()=>{

    hablar(
    "Escucha el color en inglés y arrastra la palabra correcta hacia el globo.",
    "es-ES"
    );

});

/* BOTON COLOR */

document
.getElementById("btnColor")
.addEventListener("click", ()=>{

    hablar(
    colorActual.ingles,
    "en-US"
    );

});

/* DRAG */

const palabras =
document.querySelectorAll(".palabra");

palabras.forEach(palabra=>{

    palabra.addEventListener(
    "dragstart",
    (e)=>{

        e.dataTransfer.setData(
        "text",
        palabra.id
        );

    });

});

/* DROP */

const globo =
document.getElementById("imagenColor");

globo.addEventListener(
"dragover",
(e)=>{

    e.preventDefault();

});

globo.addEventListener(
"drop",
(e)=>{

    e.preventDefault();

    const dato =
    e.dataTransfer.getData("text");

    validar(dato);

});

/* VALIDAR */

function validar(id){

    if(id === colorActual.id){

        correctas++;

        puntaje += 10;

        mensaje.innerHTML =
        "🎉 ¡CORRECTO! 🎉";

        mensaje.style.color =
        "#00ff6a";

        audioCorrecto.play();

        hablar(
        "Muy bien",
        );

        crearEstrellas();

        pendientes.shift();

        actualizar();

        setTimeout(()=>{

            iniciarJuego();

        },1500);

    }else{

        errores++;

        puntaje -= 5;

        if(puntaje < 0){

            puntaje = 0;
        }

        mensaje.innerHTML =
        "❌ INCORRECTO ❌";

        mensaje.style.color =
        "#ff1744";

        audioIncorrecto.play();


        /* GUARDAR INCORRECTO */

        if(
        !incorrectos.includes(colorActual)
        ){

            incorrectos.push(colorActual);
        }

        pendientes.shift();

        actualizar();

        setTimeout(()=>{

            iniciarJuego();

        },1500);

    }

}

/* PANEL */

function actualizar(){

    textoCorrectas.innerHTML =
    correctas;

    textoErrores.innerHTML =
    errores;

    textoPuntaje.innerHTML =
    puntaje;

}

/* ESTRELLAS */

function crearEstrellas(){

    for(let i=0; i<20; i++){

        const estrella =
        document.createElement("div");

        estrella.classList.add(
        "estrella"
        );

        estrella.innerHTML =
        "⭐";

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

        },3000);

    }

}

/* FINAL */

function crearEstrellasFinales(){

    for(let i=0; i<80; i++){

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