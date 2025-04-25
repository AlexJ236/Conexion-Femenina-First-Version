document.addEventListener('DOMContentLoaded', () => {
    const actividadBloques = document.querySelectorAll('.campana-completa');
    const intervaloCarrusel = 3000;
    const tiempoResetCarrusel = 5000;
    const numElementosLluvia = 20;
    const tiposLluviaPorActividad = {
        'dia-de-piscina-el-paraiso': ['💧', '☀️', '🏊‍♀️'],
        'picnic-por-halloween': ['🎃', '🕷️', '🍬', '👻']
    };

    const lightbox = document.getElementById('lightbox');
    const lightboxImagen = document.getElementById('lightbox-imagen');
    const cerrarLightbox = document.querySelector('.cerrar-lightbox');

    actividadBloques.forEach(actividad => {
        const imagenPrincipalContainer = actividad.querySelector('.campana-imagen-principal');
        const galeriaMiniaturas = actividad.querySelector('.campana-galeria-simple');
        const miniaturas = galeriaMiniaturas ? galeriaMiniaturas.querySelectorAll('img') : [];
        const imagenesPrincipales = imagenPrincipalContainer ? imagenPrincipalContainer.querySelectorAll('img') : [];
        const lluviaContainer = actividad.querySelector('.lluvia-container');
        const actividadId = actividad.dataset.campana;
        let indiceImagenActiva = 0;
        let intervaloAutoDeslizamiento;
        let usuarioInteractuando = false;
        let timeoutResetUsuario;

        function mostrarImagen(indice) {
            imagenesPrincipales.forEach((img, i) => {
                img.classList.remove('active');
                img.style.transform = `translateX(${i < indice ? '-100%' : (i > indice ? '100%' : '0')})`;
            });
            imagenesPrincipales[indice].classList.add('active');
        }

        function detenerAutoDeslizamiento() {
            clearInterval(intervaloAutoDeslizamiento);
        }

        miniaturas.forEach((miniatura, indice) => {
            miniatura.addEventListener('click', () => {
                indiceImagenActiva = indice;
                mostrarImagen(indiceImagenActiva);
                usuarioInteractuando = true;
                detenerAutoDeslizamiento();
                clearTimeout(timeoutResetUsuario);
                timeoutResetUsuario = setTimeout(() => {
                    usuarioInteractuando = false;
                    iniciarAutoDeslizamiento();
                }, tiempoResetCarrusel);
                // Mostrar en el lightbox al hacer clic en la miniatura
                if (lightbox && lightboxImagen) {
                    lightboxImagen.src = miniaturas[indice].src;
                    lightbox.style.display = 'flex';
                }
            });
        });

        function siguienteSlide() {
            if (!usuarioInteractuando && miniaturas.length > 1) {
                indiceImagenActiva = (indiceImagenActiva + 1) % miniaturas.length;
                mostrarImagen(indiceImagenActiva);
            }
        }

        function iniciarAutoDeslizamiento() {
            if (miniaturas.length > 1 && !usuarioInteractuando) {
                intervaloAutoDeslizamiento = setInterval(siguienteSlide, intervaloCarrusel);
            }
        }

        if (imagenesPrincipales.length > 0) {
            mostrarImagen(0);
            iniciarAutoDeslizamiento();

            imagenesPrincipales.forEach(imgPrincipal => {
                imgPrincipal.addEventListener('click', () => {
                    if (lightbox && lightboxImagen) {
                        lightboxImagen.src = imgPrincipal.src;
                        lightbox.style.display = 'flex';
                    }
                });
            });
        }

        if (tiposLluviaPorActividad[actividadId] && lluviaContainer) {
            for (let i = 0; i < numElementosLluvia; i++) {
                const elementoLluvia = document.createElement('span');
                const tipo = tiposLluviaPorActividad[actividadId][Math.floor(Math.random() * tiposLluviaPorActividad[actividadId].length)];
                elementoLluvia.textContent = tipo;
                elementoLluvia.style.left = `${Math.random() * 100}%`;
                elementoLluvia.style.animationDelay = `${Math.random() * 5}s`;
                elementoLluvia.style.animationDuration = `${5 + Math.random() * 5}s`;
                elementoLluvia.style.fontSize = `${1 + Math.random() * 1.5}em`;
                lluviaContainer.appendChild(elementoLluvia);
            }
        }
    });

    // --- Eventos para cerrar el lightbox ---
    if (cerrarLightbox) {
        cerrarLightbox.addEventListener('click', () => {
            if (lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    const hash = window.location.hash.substring(1);
    if (hash) {
        const actividadElemento = document.querySelector(`.campana-completa[data-campana="${hash}"]`);
        if (actividadElemento) {
            actividadElemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});