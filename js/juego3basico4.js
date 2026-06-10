let arrastrado = null;

let correctas = 0;

let buenas =
parseInt(localStorage.getItem("buenas")) || 0;

let malas = 0;

window.onload = function(){

    document.getElementById("nombre")
    .textContent =
    localStorage.getItem("nombre");

    document.getElementById("avatar")
    .src =
    localStorage.getItem("avatar");

    document.getElementById("buenas")
    .textContent = buenas;

    document.getElementById("malas")
    .textContent = malas;

    let nombreAlumno =
    localStorage.getItem("nombre");

    let voz =
    new SpeechSynthesisUtterance(

    "Hola " +

    nombreAlumno +

    ". Bienvenido al juego número tres llamado Paradero de Buses. " +

    "En este desafío verás varios buses con diferentes números. " +

    "Tu misión será observar cada número y arrastrar cada bus al lugar correcto. " +

    "Debes ordenarlos desde el número más pequeño hasta el número más grande. " +

    "Recuerda observar muy bien las unidades, decenas, centenas y miles. " +

    "Si te equivocas aparecerán nuevos buses para seguir practicando. " +

    "¡Mucha suerte!"

    );

    voz.lang = "es-ES";

    voz.rate = 0.9;

    voz.pitch = 1.1;

    speechSynthesis.cancel();

    speechSynthesis.speak(voz);

};

/* BUSES */

const buses =
document.querySelectorAll(".bus");

buses.forEach(bus=>{

    bus.addEventListener("dragstart",()=>{

        arrastrado = bus;

    });

});

/* ZONAS */

const zonas =
document.querySelectorAll(".zona");

zonas.forEach(zona=>{

    zona.addEventListener("dragover",(e)=>{

        e.preventDefault();

    });

    zona.addEventListener("drop",()=>{

        if(!arrastrado){

            return;

        }

        if(
        arrastrado.id ==
        zona.dataset.correcto
        ){

            zona.innerHTML = "";

            zona.appendChild(arrastrado);

            arrastrado.draggable = false;

            zona.classList.add("correcta");

            correctas++;

            buenas++;

            document.getElementById("buenas")
            .textContent = buenas;

            let correcto =
            new Audio("../SONIDO/correcto.mp3");

            correcto.play();

            document.getElementById("mensaje")
            .innerHTML =
            "⭐ ¡Correcto!";

            if(correctas === 6){

                finalizarJuego();

            }

        }else{

            malas++;

            document.getElementById("malas")
            .textContent = malas;

            let incorrecto =
            new Audio("../SONIDO/incorrecto.mp3");

            incorrecto.play();

            document.getElementById("mensaje")
            .innerHTML =
            "❌ Te equivocaste. Aparecen nuevos buses.";

            reiniciarBusesIncorrectos();

        }

    });

});

/* REINICIAR BUSES INCORRECTOS */

function reiniciarBusesIncorrectos(){

    document
    .querySelectorAll(".bus")
    .forEach(bus=>{

        if(bus.draggable){

            bus.remove();

        }

    });

    let zonasPendientes = [];

    zonas.forEach(zona=>{

        if(!zona.classList.contains("correcta")){

            zonasPendientes.push(zona);

        }

    });

    /* BUSCAR EL NÚMERO MÁS GRANDE YA CORRECTO */

    let numeroBase = 0;

    zonas.forEach(zona=>{

        if(zona.classList.contains("correcta")){

            let valor =
            parseInt(
            zona.dataset.correcto
            );

            if(valor > numeroBase){

                numeroBase = valor;

            }

        }

    });

    let nuevosNumeros = [];

    while(
    nuevosNumeros.length <
    zonasPendientes.length
    ){

        let numero =

        Math.floor(
        Math.random() *
        (10000 - numeroBase)
        ) +

        numeroBase + 1;

        if(
        !nuevosNumeros.includes(numero)
        ){

            nuevosNumeros.push(numero);

        }

    }

    let ordenados =
    [...nuevosNumeros]
    .sort((a,b)=>a-b);

    zonasPendientes.forEach(
    (zona,index)=>{

        zona.dataset.correcto =
        ordenados[index];

    });

    let mezclados =
    [...nuevosNumeros]
    .sort(
    ()=>Math.random()-0.5
    );

    mezclados.forEach(numero=>{

        let bus =
        document.createElement("div");

        bus.classList.add("bus");

        bus.draggable = true;

        bus.id = numero;

        bus.innerHTML =
        "🚌 " + numero;

        bus.addEventListener(
        "dragstart",
        ()=>{

            arrastrado = bus;

        });

        document
        .getElementById(
        "contenedorBuses"
        )
        .appendChild(bus);

    });

}

/* FINALIZAR */

function finalizarJuego(){

    localStorage.setItem(
    "buenas",
    buenas
    );

    localStorage.setItem(
    "malasJuego3",
    malas
    );

    document.getElementById("mensaje")
    .innerHTML =
    "🏆 ¡Excelente trabajo!";

    document.getElementById("siguiente")
    .style.display =
    "inline-block";

    let correcto =
    new Audio("../SONIDO/correcto.mp3");

    correcto.play();

    let nombreAlumno =
    localStorage.getItem("nombre");

    setTimeout(()=>{

        let voz =
        new SpeechSynthesisUtterance(

        "Felicitaciones " +

        nombreAlumno +

        ". Has completado correctamente el juego número tres. " +

        "Ahora estás listo para comenzar el juego número cuatro. " +

        "Presiona el botón continuar para seguir aprendiendo."

        );

        voz.lang = "es-ES";

        voz.rate = 0.9;

        voz.pitch = 1.2;

        speechSynthesis.speak(voz);

    },1000);

    confeti();

}

/* CONFETI */

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


/* SIGUIENTE */

function siguienteJuego(){

    window.location.href =
    "felicitaciones3.html";

}