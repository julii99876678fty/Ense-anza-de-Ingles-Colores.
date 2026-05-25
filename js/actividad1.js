let colores = [
    {es:"ROJO", en:"RED", img:"../img/rojo.png"},
    {es:"AZUL", en:"BLUE", img:"../img/azul.png"},
    {es:"VERDE", en:"GREEN", img:"../img/verde.png"},
    {es:"AMARILLO", en:"YELLOW", img:"../img/amarillo.png"},
    {es:"MORADO", en:"PURPLE", img:"../img/morado.png"}
];

let i = 0;

/* =========================
   INICIO
========================= */
window.onload = function(){

    hablar("Aprendamos los colores en inglés");
    actualizarBarra();
};

/* =========================
   VOZ SEGURA
========================= */
function hablar(texto){

    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }

    setTimeout(() => {

        let voz = new SpeechSynthesisUtterance(texto);

        voz.lang = "es-ES";
        voz.rate = 0.9;
        voz.pitch = 1.2;

        speechSynthesis.speak(voz);

    }, 100);
}

/* =========================
   SONIDOS
========================= */
function sonido(id){

    let a = document.getElementById(id);

    if(a){
        a.currentTime = 0;
        a.play().catch(()=>{});
    }
}

/* =========================
   ESCUCHAR (BOTÓN)
========================= */
function escuchar(){

    sonido("click");

    hablar(colores[i].en);

    document.getElementById("msg").innerText = "⭐ ¡Muy bien! ⭐";

    sonido("ok");
}

/* =========================
   SIGUIENTE COLOR
========================= */
function siguiente(){

    sonido("click");

    i++;

    if(i >= colores.length){
        finalizar();
        return;
    }

    document.getElementById("img").src = colores[i].img;
    document.getElementById("es").innerText = colores[i].es;
    document.getElementById("en").innerText = colores[i].en;

    document.getElementById("msg").innerText = "";

    actualizarBarra();
}

/* =========================
   CLICK EN IMAGEN (ESPAÑOL)
========================= */
function decirEspañol(){

    sonido("click");

    hablar(colores[i].es);

    document.getElementById("msg").innerText = "🔊 " + colores[i].es;
}

/* =========================
   BARRA DE PROGRESO
========================= */
function actualizarBarra(){

    let porcentaje = (i / colores.length) * 100;

    let bar = document.getElementById("progreso");

    if(bar){
        bar.style.width = porcentaje + "%";
    }
}

/* =========================
   FINAL DE ACTIVIDAD
========================= */
function finalizar(){

    sonido("fin");

    hablar("Felicitaciones, completaste todos los colores");

    document.body.innerHTML = `
    
    <div style="
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:linear-gradient(135deg,#1e3c72,#2a5298);
        display:flex;
        justify-content:center;
        align-items:center;
        text-align:center;
        flex-direction:column;
        color:white;
        font-size:30px;
    ">

        <div style="font-size:60px;">🎉</div>

        <h1>¡FELICITACIONES!</h1>

        <p>Terminaste la actividad de colores</p>

        <button onclick="irJuego1()" style="
            margin-top:20px;
            padding:12px 25px;
            border:none;
            border-radius:12px;
            background:linear-gradient(45deg,#ff2e7a,#ff9f1c);
            color:white;
            font-size:18px;
            cursor:pointer;
        ">
            ➡️ Ir al Juego 1
        </button>

    </div>

    `;

    lanzarConfeti();
}

/* =========================
   IR AL JUEGO 1
========================= */
function irJuego1(){

    window.location.href = "../html/juego1.html";
}

/* =========================
   CONFETI FINAL
========================= */
function lanzarConfeti(){

    for(let i=0;i<70;i++){

        let c = document.createElement("div");

        c.style.position = "fixed";
        c.style.width = "8px";
        c.style.height = "8px";
        c.style.background = `hsl(${Math.random()*360},100%,50%)`;
        c.style.left = Math.random()*100 + "vw";
        c.style.top = "-10px";
        c.style.borderRadius = "50%";
        c.style.zIndex = "9999";

        document.body.appendChild(c);

        c.animate(
            [
                { transform:"translateY(0)" },
                { transform:"translateY(110vh)" }
            ],
            {
                duration:2000 + Math.random()*2000
            }
        );

        setTimeout(()=>c.remove(),4000);
    }
}