let arrastrado = null;

let completados = 0;

let buenas =
parseInt(localStorage.getItem("buenas")) || 0;

let malas =
parseInt(localStorage.getItem("malas")) || 0;

const contenedorNumeros =
document.getElementById("contenedorNumeros");

const zonas =
document.querySelectorAll(".zona");

let numerosJuego = [];

/* INICIO */

window.onload = function(){

    generarJuego();

    actualizarPuntaje();

    let voz = new SpeechSynthesisUtterance(
        "Ordena los números desde el más pequeño hasta el más grande."
    );

    voz.lang = "es-ES";

    speechSynthesis.cancel();
    speechSynthesis.speak(voz);
};

/* PUNTAJE */

function actualizarPuntaje(){

    document.getElementById("buenas").textContent =
    buenas;

    document.getElementById("malas").textContent =
    malas;
}

/* GENERAR JUEGO */

function generarJuego(){

    completados = 0;

    numerosJuego = [];

    contenedorNumeros.innerHTML = "";

    document.getElementById("mensaje").innerHTML = "";

    document.getElementById("siguiente").style.display =
    "none";

    while(numerosJuego.length < 10){

        let numero =
        Math.floor(Math.random()*10000)+1;

        if(!numerosJuego.includes(numero)){

            numerosJuego.push(numero);
        }
    }

    let ordenados =
    [...numerosJuego].sort((a,b)=>a-b);

    zonas.forEach((zona,index)=>{

        zona.innerHTML =
        `${index+1}° Lugar`;

        zona.dataset.posicion =
        `${index+1}° Lugar`;

        zona.dataset.correcto =
        ordenados[index];

        zona.classList.remove("correcta");
    });

    let mezclados =
    [...numerosJuego].sort(
        ()=>Math.random()-0.5
    );

    mezclados.forEach(numero=>{

        crearNumero(numero);

    });
}

/* CREAR NUMERO */

function crearNumero(numero){

    let div =
    document.createElement("div");

    div.classList.add("numero");

    div.draggable = true;

    div.id = numero;

    div.textContent = numero;

    div.addEventListener("dragstart",()=>{

        arrastrado = div;

        const click =
        new Audio("../SONIDO/click.mp3");

        click.play();

    });

    contenedorNumeros.appendChild(div);
}

/* DRAG & DROP */

zonas.forEach(zona=>{

    zona.addEventListener("dragover",(e)=>{

        e.preventDefault();

    });

    zona.addEventListener("drop",()=>{

        if(!arrastrado) return;

        if(zona.classList.contains("correcta")){

            return;
        }

        let valorCorrecto =
        zona.dataset.correcto;

        if(arrastrado.id == valorCorrecto){

            zona.innerHTML = "";

            zona.appendChild(arrastrado);

            zona.classList.add("correcta");

            arrastrado.draggable = false;

            completados++;

            buenas++;

            actualizarPuntaje();

            const correcto =
            new Audio("../SONIDO/correcto.mp3");

            correcto.currentTime = 0;

            correcto.play();

            document.getElementById("mensaje").innerHTML =
            "⭐ ¡Muy bien!";

            arrastrado = null;

            if(completados === 10){

                finalizarJuego();
            }

        }else{

            malas++;

            actualizarPuntaje();

            const incorrecto =
            new Audio("../SONIDO/incorrecto.mp3");

            incorrecto.currentTime = 0;

            incorrecto.play();

            document.getElementById("mensaje").innerHTML =
            "❌ Incorrecto. Aparecen nuevos números.";

            arrastrado = null;

            setTimeout(()=>{

                reiniciarNumerosIncorrectos();

            },500);

        }

    });

});

/* NUEVOS NUMEROS AL EQUIVOCARSE */

function reiniciarNumerosIncorrectos(){

    contenedorNumeros.innerHTML = "";

    let zonasPendientes = [];

    let numeroBase = 0;

    zonas.forEach(zona=>{

        if(zona.classList.contains("correcta")){

            let valor =
            parseInt(zona.dataset.correcto);

            if(valor > numeroBase){

                numeroBase = valor;

            }

        }else{

            zona.innerHTML =
            zona.dataset.posicion;

            zonasPendientes.push(zona);

        }

    });

    let nuevosNumeros = [];

    while(
        nuevosNumeros.length <
        zonasPendientes.length
    ){

        let numero;

        if(numeroBase >= 9990){

            numero =
            Math.floor(Math.random()*10000)+1;

        }else{

            numero =
            Math.floor(
            Math.random() *
            (10000 - numeroBase)
            ) +
            numeroBase + 1;

        }

        if(
            !nuevosNumeros.includes(numero)
        ){

            nuevosNumeros.push(numero);

        }

    }

    let ordenados =
    [...nuevosNumeros].sort(
        (a,b)=>a-b
    );

    zonasPendientes.forEach(
    (zona,index)=>{

        zona.dataset.correcto =
        ordenados[index];

    });

    let mezclados =
    [...nuevosNumeros].sort(
        ()=>Math.random()-0.5
    );

    mezclados.forEach(numero=>{

        crearNumero(numero);

    });

}

/* BOTON REINICIAR */

function reiniciarJuego(){

    generarJuego();

    let voz =
    new SpeechSynthesisUtterance(
        "Se generaron nuevos números."
    );

    voz.lang = "es-ES";

    speechSynthesis.cancel();
    speechSynthesis.speak(voz);
}

/* FINALIZAR */

function finalizarJuego(){

    localStorage.setItem(
    "buenas",
    buenas
    );

    localStorage.setItem(
    "malas",
    malas
    );

    document.getElementById("mensaje").innerHTML =
    "🎉 ¡Felicitaciones! Terminaste el juego.";

    document.getElementById("siguiente").style.display =
    "inline-block";

    const correcto =
    new Audio("../SONIDO/correcto.mp3");

    correcto.play();

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
        "#ff1493"
    ];

    for(let i=0;i<150;i++){

        let papel =
        document.createElement("div");

        papel.style.position = "fixed";

        papel.style.width = "12px";

        papel.style.height = "12px";

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
        : "0";

        papel.style.zIndex = "9999";

        /* Sale desde ambos lados */

        if(Math.random() > 0.5){

            papel.style.left = "-20px";

        }else{

            papel.style.left =
            window.innerWidth + "px";

        }

        papel.style.top =
        Math.random() * 100 + "px";

        document.body.appendChild(
            papel
        );

        let x =
        parseInt(papel.style.left);

        let y =
        parseInt(papel.style.top);

        let velocidadX =
        (Math.random()*8)+3;

        if(x > 0){

            velocidadX =
            -velocidadX;
        }

        let velocidadY =
        (Math.random()*4)+2;

        let rotacion = 0;

        let anim =
        setInterval(()=>{

            x += velocidadX;

            y += velocidadY;

            rotacion += 15;

            papel.style.left =
            x + "px";

            papel.style.top =
            y + "px";

            papel.style.transform =
            `rotate(${rotacion}deg)`;

            if(
                y >
                window.innerHeight + 50
            ){

                clearInterval(anim);

                papel.remove();

            }

        },20);

    }

}

/* SIGUIENTE JUEGO */

function siguienteJuego(){

    localStorage.setItem(
    "buenas",
    buenas
    );

    localStorage.setItem(
    "malas",
    malas
    );

    window.location.href =
    "felicitaciones1.html";
}