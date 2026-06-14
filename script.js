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

    const isOpen = menu.style.display === "flex";

    // cerrar todos
    document.querySelectorAll(".contenido-expandido").forEach(m => {
        m.style.display = "none";
    });

    // abrir si estaba cerrado
    if(!isOpen){
        menu.style.display = "flex";
    }
}



document.addEventListener("click", function(e){

    if(!e.target.closest(".boton-expandible")){

        document.querySelectorAll(".contenido-expandido").forEach(m=>{
            m.style.display = "none";
        });

    }

});



