let arrastrado = null;

let correctas = 0;

let buenas =
parseInt(localStorage.getItem("buenas")) || 0;

let malas =
parseInt(localStorage.getItem("malas")) || 0;

/* CARGAR DATOS */

window.onload = function(){

    document.getElementById("nombre").textContent =
    localStorage.getItem("nombre");

    document.getElementById("avatar").src =
    localStorage.getItem("avatar");

    document.getElementById("buenas").textContent =
    buenas;

    document.getElementById("malas").textContent =
    malas;

    let voz =
    new SpeechSynthesisUtterance(
    "Bienvenido al supermercado. Debes ordenar los productos desde el más barato hasta el más caro."
    );

    voz.lang = "es-ES";
    voz.rate = 0.9;

    speechSynthesis.cancel();
    speechSynthesis.speak(voz);
};

/* PRODUCTOS */

const productos =
document.querySelectorAll(".producto");

productos.forEach(producto=>{

    producto.addEventListener("dragstart",()=>{

        arrastrado = producto;

        let click =
        new Audio("../SONIDO/click.mp3");

        click.play();

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

        if(!arrastrado) return;

        if(
            arrastrado.id ===
            zona.dataset.correcto
        ){

            zona.innerHTML = "";

            zona.appendChild(arrastrado);

            zona.classList.add("correcta");

            arrastrado.draggable = false;

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

            /* 6 PRODUCTOS */

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
            "❌ Ese producto no va en esa posición";

        }

    });

});

/* FINALIZAR */

function finalizarJuego(){

    localStorage.setItem(
    "buenas",
    buenas
    );

    localStorage.setItem(
"malasJuego2",
malas
);

    document.getElementById("mensaje")
    .innerHTML =
    "🎉 ¡Excelente! Ordenaste todos los productos correctamente.";

    document.getElementById("siguiente")
    .style.display =
    "inline-block";

    let correcto =
    new Audio("../SONIDO/correcto.mp3");

    correcto.play();

    let voz =
    new SpeechSynthesisUtterance(
    "Felicitaciones. Has completado el juego del supermercado."
    );

    voz.lang = "es-ES";

    speechSynthesis.speak(voz);

    confeti();

}

/* CONFETI DE COLORES */

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
    "felicitaciones2.html";

}