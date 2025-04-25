document.addEventListener('DOMContentLoaded', () => {
    const campanaBloques = document.querySelectorAll('.campana-completa');
    const intervaloCarrusel = 5000; // Intervalo de tiempo entre deslizamientos automáticos (en milisegundos)
    const tiempoResetCarrusel = 5000; // Tiempo de espera en milisegundos para reiniciar el auto-deslizamiento tras interacción
    const numElementosLluvia = 20;
    const tiposLluviaPorCampana = {
        'un-abrazo-contra-el-frio': ['🧥', '🧣'],
        'campanas-navidenas': ['🎄', '🔔', '❄️'],
        'cierra-ciclos-abre-sonrisas': ['🧸', '😊', '❤️‍🩹']
    };

    const lightbox = document.getElementById('lightbox');
    const lightboxImagen = document.getElementById('lightbox-imagen');
    const cerrarLightbox = document.querySelector('.cerrar-lightbox');

    campanaBloques.forEach(campana => {
        const imagenPrincipalContainer = campana.querySelector('.campana-imagen-principal');
        const galeriaMiniaturas = campana.querySelector('.campana-galeria-simple');
        const miniaturas = galeriaMiniaturas ? galeriaMiniaturas.querySelectorAll('img') : [];
        const imagenesPrincipales = imagenPrincipalContainer ? imagenPrincipalContainer.querySelectorAll('img') : [];
        const lluviaContainer = campana.querySelector('.lluvia-container');
        const campanaId = campana.dataset.campana;
        let indiceImagenActiva = 0;
        let intervaloAutoDeslizamiento;
        let usuarioInteractuando = false;
        let timeoutResetUsuario; // Nuevo timeout para controlar la inactividad

        // Muestra la imagen principal según el índice proporcionado.
        function mostrarImagen(indice) {
            imagenesPrincipales.forEach((img, i) => {
                img.classList.remove('active');
                img.style.transform = `translateX(${i < indice ? '-100%' : (i > indice ? '100%' : '0')})`;
            });
            imagenesPrincipales[indice].classList.add('active');
        }

        // Función para detener el carrusel automático.
        function detenerAutoDeslizamiento() {
            clearInterval(intervaloAutoDeslizamiento);
        }

        // Evento de clic en una miniatura para cambiar la imagen principal.
        miniaturas.forEach((miniatura, indice) => {
            miniatura.addEventListener('click', () => {
                indiceImagenActiva = indice;
                mostrarImagen(indiceImagenActiva);
                usuarioInteractuando = true; // El usuario ha interactuado
                detenerAutoDeslizamiento(); // Detener el carrusel al interactuar
                // Reiniciar el auto-deslizamiento después de un tiempo de inactividad
                clearTimeout(timeoutResetUsuario);
                timeoutResetUsuario = setTimeout(() => {
                    usuarioInteractuando = false;
                    iniciarAutoDeslizamiento();
                }, tiempoResetCarrusel);
            });
        });

        // Avanza automáticamente al siguiente slide del carrusel.
        function siguienteSlide() {
            if (!usuarioInteractuando && miniaturas.length > 1) {
                indiceImagenActiva = (indiceImagenActiva + 1) % miniaturas.length;
                mostrarImagen(indiceImagenActiva);
            }
        }

        // Inicia el deslizamiento automático del carrusel.
        function iniciarAutoDeslizamiento() {
            if (miniaturas.length > 1 && !usuarioInteractuando) {
                intervaloAutoDeslizamiento = setInterval(siguienteSlide, intervaloCarrusel);
            }
        }

        // Inicialización del carrusel: mostrar la primera imagen e iniciar el auto-deslizamiento.
        if (imagenesPrincipales.length > 0) {
            mostrarImagen(0);
            iniciarAutoDeslizamiento();

            // --- Evento de clic para mostrar el lightbox ---
            imagenesPrincipales.forEach(imgPrincipal => {
                imgPrincipal.addEventListener('click', () => {
                    const imagenSrc = imgPrincipal.src;
                    lightboxImagen.src = imagenSrc;
                    lightbox.style.display = 'flex';
                });
            });
        }

        // --- Generación de la lluvia de elementos ---
        if (tiposLluviaPorCampana[campanaId] && lluviaContainer) {
            for (let i = 0; i < numElementosLluvia; i++) {
                const elementoLluvia = document.createElement('span');
                const tipo = tiposLluviaPorCampana[campanaId][Math.floor(Math.random() * tiposLluviaPorCampana[campanaId].length)];
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
    cerrarLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Desplazamiento suave al bloque de campaña si hay un hash en la URL.
    const hash = window.location.hash.substring(1);
    if (hash) {
        const campanaElemento = document.querySelector(`.campana-completa[data-campana="${hash}"]`);
        if (campanaElemento) {
            campanaElemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});