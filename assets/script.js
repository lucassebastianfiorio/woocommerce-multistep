jQuery(document).ready(function ($) {
    let currentStep = 1;
    let cuartoPaso = false;
    console.log(cuartoPaso);
    

 

    function showStep(step) {
        // Mostrar el contenido del paso actual
        $('.step-content').hide();
        $(`.step-content[data-step="${step}"]`).fadeIn();

        // Actualizar el indicador de pasos
        //$('#steps-indicator li').removeClass('active');
        $(`#steps-indicator li[data-step="${step}"]`).addClass('active');
    }

    // Botón "Siguiente"
    $('.facturacion').on('click', function () {
        let isValid = true;

        // Verificar si todos los campos del paso actual están completos
        $(`.step-content[data-step="${currentStep}"] input`).each(function () {
            if ($(this).val() === '') {
                isValid = false;
                $(this).addClass('error'); // Agregar clase de error si el campo está vacío
                $(this).prop('required', true); // Agregar atributo "required" si el campo está vacío
                $(this).focus();
                $(this).on('input', function () {
                    $(this).removeClass('error'); // Remover clase de error si el campo está lleno
                });
                $(this).siblings('.error-message').remove(); // Remover mensajes de error existentes
                $(this).after('<span class="error-message">Campo requerido</span>');
                $(this).on('input', function () {
                    $(this).removeClass('error'); // Remover clase de error si el campo está lleno
                    $(this).siblings('.error-message').remove(); // Remover mensajes de error existentes
                });
                
            } else {
                $(this).removeClass('error'); // Remover clase de error si el campo está lleno
                $(this).siblings('.error-message').remove(); // Remover mensajes de error existentes
            }
        });

        if (isValid && currentStep < 3) { // Asegúrate de que el paso máximo sea 3
            currentStep++;
            showStep(currentStep);
        }
    });

    // Botón "Anterior"
    $('.prev-step').on('click', function () {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    

    // Mostrar el primer paso al cargar la página
    showStep(currentStep);

    // Detectar cuando se marca o desmarca la opción "Enviar a una dirección diferente"
    $('input[name="ship_to_different_address"]').on('change', function () {
        if ($(this).prop('checked')) {
            // Mostrar el paso 4 (Dirección de Envío Diferente)
            $(".direccion-opcional").fadeIn();
            cuartoPaso = true;
            console.log('Mostrar el paso 4');
            console.log(cuartoPaso);
        } else {
            // Ocultar el paso 4 (Dirección de Envío Diferente)
            $(".direccion-opcional").fadeOut();
            console.log('Ocultar el paso 4');
            cuartoPaso = false;
            console.log(cuartoPaso);
        }
    });

    // Mostrar u ocultar el paso 4 cuando se cargue la página, dependiendo de si está marcada la opción
    if ($('input[name="ship_to_different_address"]').prop('checked')) {
        $(".direccion-opcional").fadeIn();
    } else {
        $(".direccion-opcional").fadeOut();
    }




    // Validar los campos del paso 2
    function validateStep2() {
        let isValid = true;

        // Verificar si todos los campos del paso 2 están completos
        $(`.step-content[data-step="2"] input`).each(function () {
            // Si el campo está dentro de .direccion-opcional y .direccion-opcional no está visible, no validar
            if ($(this).closest('.direccion-opcional').length && !$('.direccion-opcional').is(':visible')) {
                return true; // Continuar con el siguiente campo
            }

            if ($(this).val() === '') {
                isValid = false;
                $(this).addClass('error'); // Agregar clase de error si el campo está vacío
                $(this).prop('required', true); // Agregar atributo "required" si el campo está vacío
                $(this).focus();
                $(this).on('input', function () {
                    $(this).removeClass('error'); // Remover clase de error si el campo está lleno
                });
                $(this).siblings('.error-message').remove(); // Remover mensajes de error existentes
                $(this).after('<span class="error-message">Campo requerido</span>');
                $(this).on('input', function () {
                    $(this).removeClass('error'); // Remover clase de error si el campo está lleno
                    $(this).siblings('.error-message').remove(); // Remover mensajes de error existentes
                });
            } else {
                $(this).removeClass('error'); // Remover clase de error si el campo está lleno
                $(this).siblings('.error-message').remove(); // Remover mensajes de error existentes
            }
        });

        return isValid;
    }

    // Usar la función de validación en el botón "Siguiente"
    $('.envio').on('click', function () {
        if (currentStep === 2) {
            if (validateStep2()) {
                currentStep++;
                showStep(currentStep);
            }
        } else if (currentStep < 3) {
            currentStep++;
            showStep(currentStep);
        }
    });
});


