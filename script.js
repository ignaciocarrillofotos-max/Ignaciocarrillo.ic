function toggleMenu(){
    document.getElementById("menu").classList.toggle("show");
}
    


function openImg(src){

    let lightbox = document.getElementById("lightbox");
    let img = document.getElementById("lightbox-img");

    img.src = src;
    lightbox.style.display = "flex";

}

function closeImg(){

    document.getElementById("lightbox").style.display = "none";

}


function toggleExpand(btn){

    const menu = btn.parentElement.querySelector(".contenido-expandido");

    const isOpen = menu.classList.contains("show");

    // cerrar todos
    document.querySelectorAll(".contenido-expandido").forEach(m => {
        m.classList.remove("show");
    });

    // abrir si no estaba abierto
    if(!isOpen){
        menu.classList.add("show");
    }
}



document.addEventListener("click", function(e){
    if(!e.target.closest(".boton-expandible")){
        document.querySelectorAll(".contenido-expandido").forEach(m=>{
            m.classList.remove("show");
        });

    }

});





/* =========================================
   GALERÍA PREVIEW INDEX
   3 × 3
   GRUPOS DE 9
   DESPLAZAMIENTO MANUAL
   INDICADORES
   ========================================= */

const galeriaPreview =
    document.querySelector(".galeria-preview");
const galeriaTrack =
    document.querySelector(".galeria-track");
const galeriaIndicadores =
    document.querySelector(".galeria-indicadores");

if (
    galeriaPreview &&
    galeriaTrack &&
    galeriaIndicadores
) {

    /* =====================================
       GUARDAR LAS FOTOS ORIGINALES
       ===================================== */

    const fotos =
        Array.from(
            galeriaTrack.querySelectorAll(".galeria-item")
        );


    /* =====================================
       CREAR GRUPOS DE 9
       ===================================== */

    const fotosPorPagina = 9;
    const paginas = [];
    for (
        let i = 0;
        i < fotos.length;
        i += fotosPorPagina
    ) {

        const grupo =
            fotos.slice(
                i,
                i + fotosPorPagina
            );

        paginas.push(grupo);
    }


    /* =====================================
       LIMPIAR TRACK
       ===================================== */

    galeriaTrack.innerHTML = "";

    /* =====================================
       CREAR CADA PÁGINA
       ===================================== */

    paginas.forEach((grupo) => {
        const pagina =
            document.createElement("div");
        pagina.className =
            "galeria-page";

        grupo.forEach((foto) => {
            pagina.appendChild(foto);

        });

        galeriaTrack.appendChild(pagina);

    });


    /* =====================================
       CREAR INDICADORES
       ===================================== */

    galeriaIndicadores.innerHTML = "";

    paginas.forEach((_, index) => {
        const punto =
            document.createElement("button");
        punto.type = "button";
        punto.className =
            "galeria-punto";
        punto.setAttribute(
            "aria-label",
            `Mostrar grupo ${index + 1}`
        );

        if (index === 0) {
            punto.classList.add("activo");
        }

        punto.addEventListener(
            "click",
            () => {
                const ancho =
                    galeriaPreview.clientWidth;
                galeriaPreview.scrollTo({
                    left:
                        index * ancho,
                    behavior:
                        "smooth"

                });

            }
        );

        galeriaIndicadores.appendChild(
            punto
        );

    });

    const puntos =
        Array.from(
            galeriaIndicadores
                .querySelectorAll(".galeria-punto")
        );

    /* =====================================
       ACTUALIZAR PUNTO ACTIVO
       ===================================== */

    function actualizarIndicador() {
        const ancho =
            galeriaPreview.clientWidth;
        if (!ancho) return;

        const pagina =
            Math.round(
                galeriaPreview.scrollLeft /
                ancho
            );

        puntos.forEach(
            (punto, index) => {
                punto.classList.toggle(
                    "activo",
                    index === pagina
                );

            }
        );

    }

    galeriaPreview.addEventListener(
        "scroll",
        actualizarIndicador,
        {
            passive: true
        }
    );

    /* =====================================
       ARRASTRE CON RATÓN
       ===================================== */

    let arrastrando = false;
    let inicioX = 0;
    let scrollInicial = 0;

    galeriaPreview.addEventListener(
        "mousedown",
        (e) => {
            arrastrando = true;
            galeriaPreview.classList.add(
                "arrastrando"
            );

            inicioX = e.pageX;
            scrollInicial =
                galeriaPreview.scrollLeft;

        }
    );

    galeriaPreview.addEventListener(
        "mousemove",
        (e) => {
            if (!arrastrando) return;
            e.preventDefault();

            const desplazamiento =
                e.pageX - inicioX;

            galeriaPreview.scrollLeft =
                scrollInicial -
                desplazamiento;

        }
    );


    function terminarArrastre() {
        if (!arrastrando) return;

        arrastrando = false;

        galeriaPreview.classList.remove(
            "arrastrando"
        );


        /* -----------------------------
           Ajustar a la página cercana
           ----------------------------- */

        const ancho =
            galeriaPreview.clientWidth;
        if (!ancho) return;
        const pagina =
            Math.round(
                galeriaPreview.scrollLeft /
                ancho
            );


        galeriaPreview.scrollTo({
            left:
                pagina * ancho,
            behavior:
                "smooth"

        });

    }


    galeriaPreview.addEventListener(
        "mouseup",
        terminarArrastre
    );


    galeriaPreview.addEventListener(
        "mouseleave",
        terminarArrastre
    );

}





document.querySelectorAll(".services").forEach(slider => {

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
        isDown = false;
    });

    slider.addEventListener("mouseup", () => {
        isDown = false;
    });

    slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();

        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;

        slider.scrollLeft = scrollLeft - walk;
    });

});








const clientes = document.querySelector(".clientes-slider");
clientes.innerHTML += clientes.innerHTML;
let direccion = 1;
let velocidad = 1;

function moverClientes(){
    clientes.scrollLeft += velocidad * direccion;
    const max = clientes.scrollWidth/2;
    if(clientes.scrollLeft >= max){
        direccion = -1;

    }

    if(clientes.scrollLeft <= 0){
        direccion = 1;

    }

}

let autoClientes = setInterval(moverClientes,20);
clientes.addEventListener("mouseenter",()=>{
    clearInterval(autoClientes);

});

clientes.addEventListener("mouseleave",()=>{
    autoClientes = setInterval(moverClientes,20);

});

clientes.addEventListener("touchstart",()=>{
    clearInterval(autoClientes);

});

clientes.addEventListener("touchend",()=>{
    setTimeout(()=>{
        autoClientes = setInterval(moverClientes,20);
    },1500);

});



const packs = document.querySelector(".packs-slider");
if (packs) {
    let dir = 1;
    let vel = 0.06;
    function moverPacks() {
        packs.scrollLeft += vel * dir;
        const max = packs.scrollWidth - packs.clientWidth;
        if (packs.scrollLeft >= max) {
            dir = -1;
        }
        if (packs.scrollLeft <= 0) {
            dir = 1;
        }
    }

    // SOLO EN ORDENADOR
    if (window.innerWidth > 768) {
        let autoPacks = setInterval(moverPacks, 20);
        packs.addEventListener("mouseenter", () => {
            clearInterval(autoPacks);
        });
        packs.addEventListener("mouseleave", () => {
            autoPacks = setInterval(moverPacks, 20);
        });

    }

}




const cards = document.querySelectorAll(".price-card");
const pricing = document.querySelector(".pricing");
cards.forEach(card => {
    card.addEventListener("click", (e) => {
        if (e.target.closest(".boton-expandible")) return;

        const estabaActivo = card.classList.contains("active-pack");


        /* =================================
           QUITAR ACTIVO DE TODOS
        ================================= */

        cards.forEach(c => {
            c.classList.remove("active-pack");
        });


        /* =================================
           SI ESTABA ACTIVO → CERRAR
        ================================= */

        if (estabaActivo) {
            if (pricing) {
                pricing.classList.remove("mobile-pack-open");
            }

            return;
        }


        /* =================================
           MISMO TOQUE:
           ABRIR + RESALTAR
        ================================= */

        card.classList.add("active-pack");
        if (pricing) {
            pricing.classList.add("mobile-pack-open");
        }

    });

});










function toggleHistoria() {
    const historia = document.querySelector('.historia-collapsed');
    if (!historia) return;

    historia.classList.toggle('historia-expanded');

    const texto = historia.querySelector('.historia-toggle span');
    const flecha = historia.querySelector('.flecha');

    if (historia.classList.contains('historia-expanded')) {
        texto.textContent = "Leer menos";
        flecha.style.transform = "rotate(-135deg)";
    } else {
        texto.textContent = "Leer más";
        flecha.style.transform = "rotate(45deg)";
    }
}



