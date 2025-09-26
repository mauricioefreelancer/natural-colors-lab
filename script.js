document.addEventListener('DOMContentLoaded', function() {
    // Función para cambiar el frame de hojas según la orientación
    function updateLeafFrame() {
        const hojasMarco = document.querySelector('.hojas-marco');
        if (hojasMarco) {
            // Si la pantalla es más alta que ancha (orientación vertical)
            if (window.innerWidth < window.innerHeight) {
                // Usar la versión móvil
                hojasMarco.src = 'MaterialGrafico/Iconos/hojasInicioMovil.svg';
            } else {
                // Usar la versión desktop
                hojasMarco.src = 'MaterialGrafico/Iconos/hojasInicio.svg';
            }
        }
    }

    // Llamar la función al cargar la página
    updateLeafFrame();

    // Actualizar cuando cambie el tamaño de la ventana
    window.addEventListener('resize', updateLeafFrame);
    window.addEventListener('orientationchange', function() {
        setTimeout(updateLeafFrame, 100);
    });

    // Funcionalidad para esconder/mostrar menú al hacer scroll
    let lastScrollTop = 0;
    let isMenuHidden = false;
    const desktopMenu = document.querySelector('.desktop-header .men');
    const mobileMenu = document.querySelector('.mobile-header .men-MB');
    const scrollThreshold = 10; // Umbral mínimo para detectar scroll
    
    function handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDifference = Math.abs(currentScrollTop - lastScrollTop);
        
        // Solo procesar si el scroll es significativo
        if (scrollDifference < scrollThreshold) {
            return;
        }
        
        // Si estamos en la parte superior de la página (primeros 100px), siempre mostrar menú
        if (currentScrollTop <= 100) {
            showMenu();
        } 
        // Si hacemos scroll hacia abajo y estamos más abajo de 100px
        else if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
            hideMenu();
        }
        // Si hacemos scroll hacia arriba y no estamos en la parte superior
        else if (currentScrollTop < lastScrollTop && currentScrollTop > 100) {
            showMenu();
        }
        
        lastScrollTop = currentScrollTop;
    }
    
    function hideMenu() {
        if (!isMenuHidden) {
            if (desktopMenu) desktopMenu.classList.add('hidden');
            if (mobileMenu) mobileMenu.classList.add('hidden');
            isMenuHidden = true;
        }
    }
    
    function showMenu() {
        if (isMenuHidden || lastScrollTop <= 100) {
            if (desktopMenu) desktopMenu.classList.remove('hidden');
            if (mobileMenu) mobileMenu.classList.remove('hidden');
            isMenuHidden = false;
        }
    }
    
    // Agregar event listener para scroll con throttling mejorado
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Funcionalidad para cambiar entre SVG y GIF con hover
    function setupCartFunctionality() {
        // Seleccionar todos los botones de carrito desktop
        const cartButtons = document.querySelectorAll('.cart-icon a');
        
        cartButtons.forEach((button) => {
            const cartImg = button.querySelector('img');
            
            if (cartImg) {
                // Guardar las rutas de las imágenes
                const svgSrc = 'MaterialGrafico/Iconos/iconostore.svg';
                const gifSrc = 'MaterialGrafico/Iconos/bolsaDeCompras.gif';
                
                // Evento mouseenter - cambiar a GIF
                button.addEventListener('mouseenter', function() {
                    cartImg.src = gifSrc;
                });
                
                // Evento mouseleave - volver al SVG
                button.addEventListener('mouseleave', function() {
                    cartImg.src = svgSrc;
                });
            }
        });
        
        // Funcionalidad para móvil - igual que desktop (SVG por defecto, GIF en hover)
        const mobileCartButtons = document.querySelectorAll('.mobile-header .cart-icon a');
        
        mobileCartButtons.forEach((button) => {
            const cartImg = button.querySelector('img');
            
            if (cartImg) {
                // Guardar las rutas de las imágenes
                const svgSrc = 'MaterialGrafico/Iconos/iconostore.svg';
                const gifSrc = 'MaterialGrafico/Iconos/bolsaDeCompras.gif';
                
                // Establecer SVG por defecto
                cartImg.src = svgSrc;
                
                // Evento mouseenter - cambiar a GIF
                button.addEventListener('mouseenter', function() {
                    cartImg.src = gifSrc;
                });
                
                // Evento mouseleave - volver al SVG
                button.addEventListener('mouseleave', function() {
                    cartImg.src = svgSrc;
                });
            }
        });
        
        // Funcionalidad para el botón de tienda dentro del menú móvil
        const mobileMenuCartButtons = document.querySelectorAll('.mobile-cart-option a');
        
        mobileMenuCartButtons.forEach((button) => {
            const cartImg = button.querySelector('.mobile-cart-gif');
            
            if (cartImg) {
                // Guardar las rutas de las imágenes
                const svgSrc = 'MaterialGrafico/Iconos/iconostore.svg';
                const gifSrc = 'MaterialGrafico/Iconos/bolsaDeCompras.gif';
                
                // Establecer SVG por defecto
                cartImg.src = svgSrc;
                
                // Evento mouseenter - cambiar a GIF
                button.addEventListener('mouseenter', function() {
                    cartImg.src = gifSrc;
                });
                
                // Evento mouseleave - volver al SVG
                button.addEventListener('mouseleave', function() {
                    cartImg.src = svgSrc;
                });
            }
        });
    }
    
    // Inicializar funcionalidad del carrito
    setupCartFunctionality();

    // Funcionalidad para el menú móvil
    function setupMobileMenuFunctionality() {
        const mobileMenuTrigger = document.querySelector('.div-mobile');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (mobileMenuTrigger && mobileMenu) {
            let isMenuOpen = false;
            
            // Agregar evento click al texto "Selecciona la página"
            mobileMenuTrigger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle del menú móvil con animaciones
                if (isMenuOpen) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            });
            
            function openMobileMenu() {
                mobileMenu.style.display = 'block';
                // Forzar reflow para que la animación funcione
                mobileMenu.offsetHeight;
                mobileMenu.classList.add('active');
                isMenuOpen = true;
            }
            
            function closeMobileMenu() {
                mobileMenu.classList.remove('active');
                // Esperar a que termine la animación antes de ocultar
                setTimeout(() => {
                    if (!mobileMenu.classList.contains('active')) {
                        mobileMenu.style.display = 'none';
                    }
                }, 400);
                isMenuOpen = false;
            }
            
            // Cerrar menú al hacer click fuera de él
            document.addEventListener('click', function(e) {
                if (isMenuOpen && !mobileMenuTrigger.contains(e.target) && !mobileMenu.contains(e.target)) {
                    closeMobileMenu();
                }
            });
            
            // Cerrar menú al hacer click en un enlace del menú
            const menuLinks = mobileMenu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', function() {
                    closeMobileMenu();
                });
            });
        }
    }
    
    // Inicializar funcionalidad del menú móvil
    setupMobileMenuFunctionality();
});