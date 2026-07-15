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

let autoScroll = setInterval(()=>{
    slider.scrollLeft += 1;

    if(slider.scrollLeft + slider.clientWidth >= slider.scrollWidth){
        slider.scrollLeft = 0;
    }
}, 20);

slider.addEventListener("mouseenter", ()=> clearInterval(autoScroll));
slider.addEventListener("mouseleave", ()=>{
    autoScroll = setInterval(()=>{
        slider.scrollLeft += 1;
        if(slider.scrollLeft + slider.clientWidth >= slider.scrollWidth){
            slider.scrollLeft = 0;
        }
    }, 20);
});


