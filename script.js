function toggleMenu(){

    let menu = document.getElementById("menu");

    if(menu.style.display == "flex"){
        menu.style.display = "none";
    }else{
        menu.style.display = "flex";
    }

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

    const abierto = menu.style.display === "flex";

    document.querySelectorAll(".contenido-expandido").forEach(m=>{
        m.style.display = "none";
    });

    if(!abierto){
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
