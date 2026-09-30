// =========================
// GALERÍA | CORRECCIONES RESPONSIVE + TOUCH + SAFE AREA
// =========================

const gallery = document.querySelector('.gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const contador = document.getElementById('contador');
const miniaturas = document.getElementById('miniaturas');
const btnCerrar = document.querySelector('.close');
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');

let imagenes = [];
let indiceActual = 0;
let touchStartX = 0;
let touchEndX = 0;
let zoom = false;
let escala = 1;
let imgX = 0;
let imgY = 0;
let startX = 0;
let startY = 0;

function inicializarGaleria() {
    if (!gallery) return;

    const imagenesGaleria = Array.from(gallery.querySelectorAll('img')).filter(img => !img.classList.contains('gallery-watermark'));

    if (!imagenesGaleria.length) {
        console.warn('No se encontraron imágenes en la galería.');
        return;
    }

    imagenes = imagenesGaleria;

    imagenes.forEach((img, index) => {
        img.addEventListener('click', () => abrirImagen(index));
    });

    crearMiniaturas();
    actualizarMiniaturas();
}

function crearMiniaturas() {
    if (!miniaturas) return;

    miniaturas.innerHTML = '';

    imagenes.forEach((img, index) => {
        const mini = document.createElement('img');
        mini.src = img.src;
        mini.alt = 'Miniatura ' + (index + 1);
        mini.title = 'Ver imagen ' + (index + 1);
        mini.addEventListener('click', () => abrirImagen(index));
        miniaturas.appendChild(mini);
    });
}

function actualizarMiniaturas() {
    if (!miniaturas) return;

    const minis = miniaturas.querySelectorAll('img');
    minis.forEach((mini, index) => {
        mini.classList.toggle('active', index === indiceActual);
    });
}

function abrirImagen(index) {
    if (!lightbox || !lightboxImg || !imagenes.length) return;

    indiceActual = (index + imagenes.length) % imagenes.length;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    lightboxImg.src = imagenes[indiceActual].src;
    lightboxImg.alt = 'Imagen ' + (indiceActual + 1);
    lightboxImg.style.transform = 'scale(1)';
    lightboxImg.style.cursor = 'zoom-in';

    escala = 1;
    zoom = false;
    imgX = 0;
    imgY = 0;

    if (contador) {
        contador.textContent = `${indiceActual + 1} / ${imagenes.length}`;
    }

    actualizarMiniaturas();
    lightboxImg.classList.remove('animar');
    void lightboxImg.offsetWidth;
    lightboxImg.classList.add('animar');
}

function cerrarImagen() {
    if (!lightbox) return;
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
    zoom = false;
    escala = 1;
    imgX = 0;
    imgY = 0;
    if (lightboxImg) {
        lightboxImg.style.transform = 'scale(1)';
        lightboxImg.style.cursor = 'zoom-in';
    }
}

if (btnCerrar) {
    btnCerrar.addEventListener('click', cerrarImagen);
}

if (btnPrev) {
    btnPrev.addEventListener('click', () => {
        abrirImagen(indiceActual - 1);
    });
}

if (btnNext) {
    btnNext.addEventListener('click', () => {
        abrirImagen(indiceActual + 1);
    });
}

document.addEventListener('keydown', (e) => {
    if (!lightbox || lightbox.style.display !== 'flex') return;

    if (e.key === 'ArrowRight') abrirImagen(indiceActual + 1);
    if (e.key === 'ArrowLeft') abrirImagen(indiceActual - 1);
    if (e.key === 'Escape') cerrarImagen();
});

if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
        if (!e.changedTouches || !e.changedTouches.length) return;
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        if (!e.changedTouches || !e.changedTouches.length) return;
        if (zoom || escala > 1) return;

        touchEndX = e.changedTouches[0].screenX;
        const diferencia = touchEndX - touchStartX;

        if (diferencia < -60) abrirImagen(indiceActual + 1);
        if (diferencia > 60) abrirImagen(indiceActual - 1);
    }, { passive: true });
}

if (lightboxImg) {
    lightboxImg.addEventListener('dblclick', () => {
        zoom = !zoom;

        if (zoom) {
            lightboxImg.style.transform = `scale(2) translate(${imgX}px, ${imgY}px)`;
            lightboxImg.style.cursor = 'zoom-out';
            escala = 2;
        } else {
            imgX = 0;
            imgY = 0;
            escala = 1;
            lightboxImg.style.transform = 'scale(1)';
            lightboxImg.style.cursor = 'zoom-in';
        }
    });

    lightboxImg.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (window.innerWidth <= 768) return;

        escala += (e.deltaY < 0 ? 0.15 : -0.15);
        if (escala < 1) escala = 1;
        if (escala > 4) escala = 4;

        lightboxImg.style.transform = `scale(${escala}) translate(${imgX}px, ${imgY}px)`;
    }, { passive: false });

    lightboxImg.addEventListener('touchstart', (e) => {
        if (escala <= 1 || !e.touches || !e.touches.length) return;
        const t = e.touches[0];
        startX = t.clientX - imgX;
        startY = t.clientY - imgY;
    }, { passive: true });

    lightboxImg.addEventListener('touchmove', (e) => {
        if (escala <= 1 || !e.touches || !e.touches.length) return;
        const t = e.touches[0];
        imgX = t.clientX - startX;
        imgY = t.clientY - startY;
        lightboxImg.style.transform = `scale(${escala}) translate(${imgX}px, ${imgY}px)`;
    }, { passive: true });
});

// Mejor soporte táctil para dispositivos móviles
if (window.matchMedia('(pointer: coarse)').matches) {
    document.body.style.touchAction = 'pan-y';
}

window.addEventListener('DOMContentLoaded', () => {
    inicializarGaleria();
});

// Protección para evitar errores si algún elemento no existe.
if (window && typeof window === 'object') {
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && lightbox && lightbox.style.display === 'flex') {
            if (lightboxImg) {
                lightboxImg.style.transform = 'scale(1)';
            }
            escala = 1;
            zoom = false;
        }
    });
}
