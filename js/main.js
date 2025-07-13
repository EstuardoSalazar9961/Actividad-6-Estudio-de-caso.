$(document).ready(function() {
    // Lógica para el botón de categorías (menú hamburguesa)
    const $btnCategorias = $('#btnCategorias');
    const $categoriesNav = $('#categories-nav');

    $btnCategorias.on('click', function() {
        $categoriesNav.toggleClass('is-active');
        // Actualiza el atributo aria-expanded para accesibilidad
        const isExpanded = $btnCategorias.attr('aria-expanded') === 'true' || false;
        $btnCategorias.attr('aria-expanded', !isExpanded);
    });

    // Lógica para cerrar el menú si se hace clic fuera
    $(document).on('click', function(event) {
        // Si el clic no fue en el botón de categorías ni dentro del menú de categorías
        if (!$(event.target).closest('#btnCategorias').length && !$(event.target).closest('#categories-nav').length) {
            if ($categoriesNav.hasClass('is-active')) {
                $categoriesNav.removeClass('is-active');
                $btnCategorias.attr('aria-expanded', false); // Restablecer aria-expanded
            }
        }
    });

    // Lógica para el botón del slide (scroll hacia arriba o hacia el slider)
    $('#btnSlide').on('click', function() {
        $('html, body').animate({
            scrollTop: $('#main-slider').offset().top
        }, 500); // 500ms de duración para el scroll
    });

    // Inicialización de Flexslider
    // Asegúrate de que los slides tengan la clase 'slides' en el ul
    $('.flexslider').flexslider({
        animation: "slide", // Tipo de animación: "fade" o "slide"
        controlNav: false,  // Desactivar paginación por defecto de Flexslider
        directionNav: false, // Desactivar flechas por defecto de Flexslider
        slideshowSpeed: 7000, // Duración de cada slide
        animationSpeed: 600, // Velocidad de la animación
        after: function(slider) {
            // Actualizar la paginación personalizada
            $('.slider-pagination li').removeClass('active');
            $('.slider-pagination li[data-slide-index="' + slider.currentSlide + '"]').addClass('active');
        }
    });

    // Manejar clics en la paginación personalizada
    $('.slider-pagination li').on('click', function() {
        var slideIndex = $(this).data('slide-index'); // Usar data-slide-index
        $('.flexslider').flexslider(slideIndex);
    });

    // Manejar clics en las flechas de navegación personalizadas
    $('#retroceder').on('click', function() {
        $('.flexslider').flexslider('prev');
    });

    $('#avanzar').on('click', function() {
        $('.flexslider').flexslider('next');
    });

    // Lógica para simular datos del carrito (opcional)
    // Esto es solo un ejemplo, en un sitio real vendría de un backend
    function updateCartInfo() {
        const quantity = 3; // Ejemplo: 3 items en el carrito
        const total = 125.50; // Ejemplo: total $125.50

        $('.quantity-cart').text(quantity);
        $('.sum-cart').text(total.toFixed(2)); // Formato con 2 decimales
    }
    updateCartInfo(); // Llama a la función al cargar la página

    // Lógica para el registro/ingreso (si hay validaciones JS adicionales)
    function registroUsuario() {
        // Aquí iría tu lógica de validación del formulario de registro
        // Por ejemplo, verificar que las contraseñas coincidan, email válido, etc.
        const regPoliticas = $('#regPoliticas').is(':checked');
        if (!regPoliticas) {
            swal("Error", "Debes aceptar las condiciones de uso y políticas de privacidad.", "warning");
            return false; // Previene el envío del formulario
        }
        // Si todo es válido, permite el envío o realiza una petición AJAX
        return true;
    }
    // Asigna la función al evento submit del formulario de registro si es necesario
    // (ya está en el HTML como onsubmit="return registroUsuario()")
});