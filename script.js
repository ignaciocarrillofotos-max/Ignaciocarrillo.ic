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


const slider = document.querySelector('.services');

function autoMove(){
    slider.scrollLeft += 2;

    // Reiniciar ANTES del final para evitar rebote en móvil
    const limit = slider.scrollWidth - slider.clientWidth - 5;

    if(slider.scrollLeft >= limit){
        slider.scrollLeft = 0;
    }
}

let autoScroll = setInterval(autoMove, 20);

// Pausa en PC
slider.addEventListener("mouseenter", ()=> clearInterval(autoScroll));
slider.addEventListener("mouseleave", ()=>{
    autoScroll = setInterval(autoMove, 20);
});

// Pausa en móvil
slider.addEventListener("touchstart", ()=> clearInterval(autoScroll));
slider.addEventListener("touchend", ()=>{
    autoScroll = setInterval(autoMove, 20);
});




