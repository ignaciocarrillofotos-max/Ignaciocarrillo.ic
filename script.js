// =========================
// PROTECCIÓN GLOBAL
// =========================
'use strict';

// Evitar errores si elementos no existen
const safeQueryAll = (selector) => Array.from(document.querySelectorAll(selector) || []);
const safeQuery = (selector) => document.querySelector(selector) || null;

// =========================
// MENÚ MÓVIL
// =========================
const menuToggle = safeQuery('.menu-toggle');
const navlinks = safeQuery('.navlinks');

if (menuToggle && navlinks) {
    menuToggle.addEventListener('click', () => {
        navlinks.classList.toggle('show');
    });

    safeQueryAll('.navlinks a').forEach(link => {
        link.addEventListener('click', () => {
            navlinks.classList.remove('show');
        });
    });
}

// =========================
// GALERÍA PREVIEW INDEX
// =========================
const galeriaPreview = safeQuery('.galeria-preview');
const galeriaTrack = safeQuery('.galeria-track');
const galeriaIndicadores = safeQuery('.galeria-indicadores');

if (galeriaPreview && galeriaTrack && galeriaIndicadores) {
    const fotos = Array.from(galeriaTrack.querySelectorAll('.galeria-item'));

    if (fotos.length > 0) {
        const fotosPorPagina = 9;
        const paginas = [];

        for (let i = 0; i < fotos.length; i += fotosPorPagina) {
            paginas.push(fotos.slice(i, i + fotosPorPagina));
        }

        galeriaTrack.innerHTML = '';

        paginas.forEach((grupo) => {
            const pagina = document.createElement('div');
            pagina.className = 'galeria-page';
            grupo.forEach((foto) => pagina.appendChild(foto));
            galeriaTrack.appendChild(pagina);
        });

        galeriaIndicadores.innerHTML = '';
        const puntos = [];

        paginas.forEach((_, index) => {
            const punto = document.createElement('button');
            punto.type = 'button';
            punto.className = index === 0 ? 'galeria-punto activo' : 'galeria-punto';
            punto.setAttribute('aria-label', `Mostrar grupo ${index + 1}`);

            punto.addEventListener('click', () => {
                const ancho = galeriaPreview.clientWidth;
                if (ancho > 0) {
                    galeriaPreview.scrollTo({ left: index * ancho, behavior: 'smooth' });
                }
            });

            galeriaIndicadores.appendChild(punto);
            puntos.push(punto);
        });

        function actualizarIndicador() {
            const ancho = galeriaPreview.clientWidth;
            if (ancho <= 0) return;

            const pagina = Math.round(galeriaPreview.scrollLeft / ancho);
            puntos.forEach((punto, i) => {
                punto.classList.toggle('activo', i === pagina);
            });
        }

        galeriaPreview.addEventListener('scroll', actualizarIndicador, { passive: true });

        // Mouse drag
        let arrastrando = false;
        let inicioX = 0;
        let scrollInicial = 0;

        galeriaPreview.addEventListener('mousedown', (e) => {
            arrastrando = true;
            galeriaPreview.classList.add('arrastrando');
            inicioX = e.pageX;
            scrollInicial = galeriaPreview.scrollLeft;
        });

        galeriaPreview.addEventListener('mousemove', (e) => {
            if (!arrastrando) return;
            const desplazamiento = e.pageX - inicioX;
            galeriaPreview.scrollLeft = scrollInicial - desplazamiento;
        });

        function terminarArrastre() {
            if (!arrastrando) return;
            arrastrando = false;
            galeriaPreview.classList.remove('arrastrando');

            const ancho = galeriaPreview.clientWidth;
            if (ancho > 0) {
                const pagina = Math.round(galeriaPreview.scrollLeft / ancho);
                galeriaPreview.scrollTo({ left: pagina * ancho, behavior: 'smooth' });
            }
        }

        galeriaPreview.addEventListener('mouseup', terminarArrastre);
        galeriaPreview.addEventListener('mouseleave', terminarArrastre);

        // Touch drag
        let touchStartX = 0;
        galeriaPreview.addEventListener('touchstart', (e) => {
            if (e.touches && e.touches.length) {
                touchStartX = e.touches[0].clientX;
            }
        }, { passive: true });

        galeriaPreview.addEventListener('touchend', (e) => {
            if (!e.changedTouches || !e.changedTouches.length) return;
            const touchEndX = e.changedTouches[0].clientX;
            const diferencia = touchEndX - touchStartX;

            if (Math.abs(diferencia) > 60) {
                const ancho = galeriaPreview.clientWidth;
                if (ancho > 0) {
                    let pagina = Math.round(galeriaPreview.scrollLeft / ancho);
                    if (diferencia > 0) pagina--;
                    else pagina++;

                    pagina = Math.max(0, Math.min(pagina, paginas.length - 1));
                    galeriaPreview.scrollTo({ left: pagina * ancho, behavior: 'smooth' });
                }
            }
        }, { passive: true });
    }
}

// =========================
// SERVICIOS SLIDER
// =========================
const servicesSliders = safeQueryAll('.services');

servicesSliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
    });

    // Touch para servicios
    let touchStart = 0;
    slider.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length) {
            touchStart = e.touches[0].clientX;
        }
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        if (!e.touches || !e.touches.length) return;
        const touchMove = e.touches[0].clientX;
        const walk = (touchMove - touchStart) * 0.5;
        slider.scrollLeft = scrollLeft - walk;
    }, { passive: true });

    slider.addEventListener('touchend', () => {
        touchStart = 0;
    }, { passive: true });
});

// =========================
// CLIENTES SLIDER
// =========================
const clientesSlider = safeQuery('.clientes-slider');

if (clientesSlider) {
    clientesSlider.innerHTML += clientesSlider.innerHTML;

    let direccion = 1;
    const velocidad = 0.8;
    let autoClientes = null;

    function moverClientes() {
        clientesSlider.scrollLeft += velocidad * direccion;
        const max = clientesSlider.scrollWidth / 2;

        if (clientesSlider.scrollLeft >= max) direccion = -1;
        if (clientesSlider.scrollLeft <= 0) direccion = 1;
    }

    autoClientes = setInterval(moverClientes, 25);

    clientesSlider.addEventListener('mouseenter', () => {
        if (autoClientes) clearInterval(autoClientes);
    });

    clientesSlider.addEventListener('mouseleave', () => {
        autoClientes = setInterval(moverClientes, 25);
    });

    clientesSlider.addEventListener('touchstart', () => {
        if (autoClientes) clearInterval(autoClientes);
    }, { passive: true });

    clientesSlider.addEventListener('touchend', () => {
        setTimeout(() => {
            autoClientes = setInterval(moverClientes, 25);
        }, 1500);
    }, { passive: true });
}

// =========================
// PACKS - INTERACCIÓN
// =========================
const priceCards = safeQueryAll('.price-card');
const detailsContainer = safeQuery('.pack-details');

priceCards.forEach(card => {
    card.addEventListener('click', () => {
        const packName = card.dataset.pack;
        const estabaActivo = card.classList.contains('active-pack');

        priceCards.forEach(c => c.classList.remove('active-pack'));
        safeQueryAll('.pack-detail').forEach(detail => detail.classList.remove('active-detail'));

        if (estabaActivo) {
            if (window.innerWidth >= 900 && detailsContainer) {
                const detail = safeQuery(`.pack-detail[data-detail="${packName}"]`);
                if (detail) detailsContainer.appendChild(detail);
            }
            return;
        }

        card.classList.add('active-pack');

        const detail = safeQuery(`.pack-detail[data-detail="${packName}"]`);
        if (!detail) return;

        if (window.innerWidth >= 900) {
            card.appendChild(detail);
            detail.classList.add('active-detail');
        } else {
            if (detailsContainer) detailsContainer.appendChild(detail);
            detail.classList.add('active-detail');
        }
    });
});

// =========================
// PACKS SLIDER AUTOMÁTICO (solo PC)
// =========================
const packsSlider = safeQuery('.packs-slider');

if (packsSlider && window.innerWidth > 768) {
    let packDir = 1;
    const packVel = 0.06;
    let autoPacks = null;

    function moverPacks() {
        packsSlider.scrollLeft += packVel * packDir;
        const max = packsSlider.scrollWidth - packsSlider.clientWidth;

        if (packsSlider.scrollLeft >= max) packDir = -1;
        if (packsSlider.scrollLeft <= 0) packDir = 1;
    }

    if (window.innerWidth > 768) {
        autoPacks = setInterval(moverPacks, 20);

        packsSlider.addEventListener('mouseenter', () => {
            if (autoPacks) clearInterval(autoPacks);
        });

        packsSlider.addEventListener('mouseleave', () => {
            autoPacks = setInterval(moverPacks, 20);
        });
    }
}

// =========================
// SMOOTH SCROLL MEJORADO
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// =========================
// LAZY LOADING MEJORADO
// =========================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    safeQueryAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// =========================
// OPTIMIZAR VIEWPORT EN RESIZE
// =========================
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalcular en resize si es necesario
    }, 200);
});
