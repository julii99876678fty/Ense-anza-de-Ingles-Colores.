let buenas =
parseInt(localStorage.getItem("buenas")) || 0;

let malas = 0;

let puerta = 1;

let respuestaCorrecta = 0;

const desafios = [

() => {

    let n1 = 3500;
    let n2 = 1200;

    respuestaCorrecta =
    n1 + n2;

    return `
    La nave tiene ${n1}
    unidades de energía.

    Encuentra cuánta energía
    tendrá si recibe
    ${n2} unidades más.
    `;

},

() => {

    let n1 = 8500;
    let n2 = 2300;

    respuestaCorrecta =
    n1 - n2;

    return `
    El robot tenía
    ${n1} créditos.

    Gastó ${n2} créditos.

    ¿Cuántos le quedan?
    `;

},

() => {

    let n1 = 450;
    let n2 = 8;

    respuestaCorrecta =
    n1 * n2;

    return `
    Hay 450 módulos
    espaciales.

    Cada módulo tiene
    8 baterías.

    ¿Cuántas baterías
    hay en total?
    `;

},

() => {

    let n1 = 9200;
    let n2 = 1700;
    let n3 = 800;

    respuestaCorrecta =
    n1 + n2 - n3;

    return `
    Saldo inicial:
    ${n1}

    Depósito:
    ${n2}

    Retiro:
    ${n3}

    ¿Cuánto dinero queda?
    `;

},

() => {

    respuestaCorrecta =
    7425;

    return `
    Código secreto de la estación:

    Tiene 4 cifras.

    Es mayor que 7000.

    Es menor que 7500.

    La cifra de las centenas es 4.

    La cifra de las decenas es 2.

    Termina en 5.

    ¿Cuál es el código?
    `;

}

];

window.onload = function(){

    document.getElementById(
    "nombre"
    ).textContent =
    localStorage.getItem(
    "nombre"
    );

    document.getElementById(
    "avatar"
    ).src =
    localStorage.getItem(
    "avatar"
    );

    actualizar();

    mostrarPuerta();

    let voz =
    new SpeechSynthesisUtterance(

    "Hola " +

    localStorage.getItem("nombre") +

    ". Bienvenido al Escape Matemático del Futuro. " +

    "Deberás abrir cinco puertas espaciales resolviendo desafíos matemáticos. " +

    "Cada puerta será más difícil que la anterior. " +

    "Piensa muy bien antes de responder. " +

    "Mucha suerte."

    );

    voz.lang = "es-ES";

    voz.rate = 0.9;

    voz.pitch = 1.1;

    speechSynthesis.cancel();

    speechSynthesis.speak(
    voz
    );

};

function actualizar(){

    document.getElementById(
    "buenas"
    ).textContent =
    buenas;

    document.getElementById(
    "malas"
    ).textContent =
    malas;

}

function mostrarPuerta(){

    document.getElementById(
    "puerta"
    ).innerHTML =

    "🚪 Puerta " +
    puerta +
    " de 5";

    document.getElementById(
    "respuesta"
    ).value = "";

    document.getElementById(
    "mensaje"
    ).innerHTML = "";

    document.getElementById(
    "mision"
    ).innerHTML =

    desafios[
    puerta - 1
    ]();

}

function verificar(){

    let respuesta =

    parseInt(
    document.getElementById(
    "respuesta"
    ).value
    );

    if(
    respuesta ===
    respuestaCorrecta
    ){

        buenas++;

        actualizar();

        let correcto =
        new Audio(
        "../SONIDO/correcto.mp3"
        );

        correcto.play();

        document.getElementById(
        "mensaje"
        ).innerHTML =

        "⭐ ¡Puerta abierta correctamente!";

        puerta++;

        if(puerta > 5){

            finalizar();

        }else{

            setTimeout(()=>{

                mostrarPuerta();

            },1200);

        }

    }else{

        malas++;

        actualizar();

        let incorrecto =
        new Audio(
        "../SONIDO/incorrecto.mp3"
        );

        incorrecto.play();

        document.getElementById(
        "mensaje"
        ).innerHTML =

        "❌ Respuesta incorrecta. Inténtalo nuevamente.";

    }

}

function finalizar(){

    localStorage.setItem(
    "buenas",
    buenas
    );

    localStorage.setItem(
    "malasJuego6",
    malas
    );

    document.getElementById(
    "mensaje"
    ).innerHTML =

    "🏆 ¡Has escapado de la estación espacial!";

    let voz =
    new SpeechSynthesisUtterance(

    "Felicitaciones " +

    localStorage.getItem("nombre") +

    ". Has logrado abrir las cinco puertas del Escape Matemático del Futuro. " +

    "Completaste exitosamente todos los desafíos matemáticos."

    );

    voz.lang = "es-ES";

    voz.rate = 0.9;

    voz.pitch = 1.1;

    speechSynthesis.speak(
    voz
    );

    document.getElementById(
    "siguiente"
    ).style.display =
    "inline-block";

    confeti();

}

function confeti(){

    const colores = [

        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#ffff00",
        "#ff00ff",
        "#00ffff",
        "#ff8800",
        "#ff1493",
        "#ffd700",
        "#ffffff"

    ];

    for(let i = 0; i < 350; i++){

        let papel =
        document.createElement("div");

        papel.style.position =
        "fixed";

        let tamaño =

        Math.random() * 18 + 8;

        papel.style.width =
        tamaño + "px";

        papel.style.height =
        tamaño + "px";

        papel.style.background =

        colores[
            Math.floor(
                Math.random() *
                colores.length
            )
        ];

        papel.style.borderRadius =

        Math.random() > 0.5
        ? "50%"
        : "3px";

        papel.style.zIndex =
        "9999";

        papel.style.pointerEvents =
        "none";

        let ladoIzquierdo =

        Math.random() > 0.5;

        if(ladoIzquierdo){

            papel.style.left =
            "-40px";

        }

        else{

            papel.style.left =
            (window.innerWidth + 40)
            + "px";

        }

        papel.style.top =
        (window.innerHeight - 120)
        + "px";

        document.body.appendChild(
            papel
        );

        let x =
        parseFloat(
            papel.style.left
        );

        let y =
        parseFloat(
            papel.style.top
        );

        let velocidadX =

        ladoIzquierdo

        ?

        (Math.random()*8)+8

        :

        -((Math.random()*8)+8);

        let velocidadY =

        -(Math.random()*15+18);

        let gravedad =
        0.28;

        let rotacion =
        Math.random()*360;

        let velocidadRotacion =

        (Math.random()*18)+8;

        let curva =

        (Math.random()*2)-1;

        let animacion =

        setInterval(()=>{

            velocidadY +=
            gravedad;

            velocidadX +=
            curva * 0.03;

            x +=
            velocidadX;

            y +=
            velocidadY;

            rotacion +=
            velocidadRotacion;

            papel.style.left =
            x + "px";

            papel.style.top =
            y + "px";

            papel.style.transform =

            `rotate(${rotacion}deg)`;

            if(
                y >
                window.innerHeight + 200
            ){

                clearInterval(
                animacion
                );

                papel.remove();

            }

        },16);

    }

}


function siguienteJuego(){

    window.location.href =
    "felicitaciones6.html";

}