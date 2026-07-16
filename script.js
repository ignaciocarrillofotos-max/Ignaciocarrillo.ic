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


document.querySelectorAll(".services").forEach((slider,index)=>{
    slider.innerHTML += slider.innerHTML;
    let velocidad = index===0 ? 1.2 : -1.2;
    if(index===1){
        slider.scrollLeft = slider.scrollWidth/2;
    }

    function mover(){
        slider.scrollLeft += velocidad;
        if(velocidad>0){
            if(slider.scrollLeft >= slider.scrollWidth/2){
                slider.scrollLeft = 0;
            }

        }else{
            if(slider.scrollLeft<=0){
                slider.scrollLeft = slider.scrollWidth/2;
            }

        }

    }

    let auto = setInterval(mover,20);
    slider.addEventListener("mouseenter",()=>clearInterval(auto));
    slider.addEventListener("mouseleave",()=>{
        auto = setInterval(mover,20);
    });

    slider.addEventListener("touchstart",()=>clearInterval(auto));
    slider.addEventListener("touchend",()=>{

        setTimeout(()=>{
            auto = setInterval(mover,20);
        },1500);

    });

});

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



const clientes = document.querySelector('.clientes-slider');

function autoMoveClientes(){
    clientes.scrollLeft += 1.2;

    // Reiniciar ANTES del final para evitar rebote en móvil
    const limit = clientes.scrollWidth - clientes.clientWidth - 5;

    if(clientes.scrollLeft >= limit){
        clientes.scrollLeft = 0;
    }
}

let autoScrollClientes = setInterval(autoMoveClientes, 20);

// Pausa en PC
clientes.addEventListener("mouseenter", ()=> clearInterval(autoScrollClientes));
clientes.addEventListener("mouseleave", ()=>{
    autoScrollClientes = setInterval(autoMoveClientes, 20);
});

// Pausa en móvil
clientes.addEventListener("touchstart", ()=> clearInterval(autoScrollClientes));
clientes.addEventListener("touchend", ()=>{
    autoScrollClientes = setInterval(autoMoveClientes, 20);
});



