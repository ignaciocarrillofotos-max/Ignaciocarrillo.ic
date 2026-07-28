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



/* =========================
   GALERÍA PREVIEW INDEX
========================= */

const galeriaPreview = document.querySelector(".galeria-track");
if (galeriaPreview) {
    galeriaPreview.innerHTML += galeriaPreview.innerHTML;
    let posicion = 0;
    let velocidad = 0.5;
    let pausado = false;
    function moverGaleria(){
        if(!pausado){
            posicion += velocidad;
            if(posicion >= galeriaPreview.scrollWidth / 2){
                posicion = 0;
            }
            galeriaPreview.style.transform =
                `translateX(-${posicion}px)`;
        }

        requestAnimationFrame(moverGaleria);
    }

    galeriaPreview.addEventListener("mouseenter",()=>{
        pausado = true;
    });

    galeriaPreview.addEventListener("mouseleave",()=>{
        pausado = false;
    });

    galeriaPreview.addEventListener("touchstart",()=>{
        pausado = true;
    });


    galeriaPreview.addEventListener("touchend",()=>{
        setTimeout(()=>{
            pausado = false;
        },1500);
    });

    moverGaleria();

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

cards.forEach(card => {
 card.addEventListener("click",(e)=>{
    if(e.target.closest(".boton-expandible")) return;
    if(card.classList.contains("active-pack")){
        card.classList.remove("active-pack");
    }else{
        cards.forEach(c=>c.classList.remove("active-pack"));
        card.classList.add("active-pack");

    }

});
});





document.querySelectorAll(".pack-box ol, .pack-box ul").forEach(lista=>{
    let velocidad = 0.3;
    function mover(){
        lista.scrollTop += velocidad;
        if(lista.scrollTop >= lista.scrollHeight - lista.clientHeight){
            lista.scrollTop = 0;

        }

    }

    let auto = setInterval(mover,25);
    lista.addEventListener("mouseenter",()=>{
        clearInterval(auto);

    });

    lista.addEventListener("mouseleave",()=>{
        auto = setInterval(mover,25);

    });

    lista.addEventListener("touchstart",()=>{
        clearInterval(auto);

    });

    lista.addEventListener("touchend",()=>{
        setTimeout(()=>{
            auto = setInterval(mover,25);
        },2000);

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



