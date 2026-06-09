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

    for(let i=0;i<150;i++){

        let confeti =
        document.createElement("div");

        let figuras =
        ["🎉","🟢","🔵","🟡","🟣","🟠"];

        confeti.innerHTML =
        figuras[
        Math.floor(
        Math.random()*figuras.length
        )
        ];

        confeti.style.position =
        "fixed";

        confeti.style.left =
        Math.random()*100 + "vw";

        confeti.style.top =
        "-30px";

        confeti.style.fontSize =
        (20 + Math.random()*20) + "px";

        confeti.style.zIndex =
        "9999";

        document.body.appendChild(
        confeti
        );

        let pos = -30;

        let velocidad =
        Math.random()*5 + 3;

        let anim =
        setInterval(()=>{

            pos += velocidad;

            confeti.style.top =
            pos + "px";

            confeti.style.transform =
            `rotate(${pos*3}deg)`;

            if(
            pos >
            window.innerHeight
            ){

                clearInterval(anim);

                confeti.remove();

            }

        },20);

    }

}

/* SIGUIENTE */

function siguienteJuego(){

    window.location.href =
    "felicitaciones2.html";

}