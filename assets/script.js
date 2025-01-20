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
            $(".step-content[data-step='4']").fadeIn();
            cuartoPaso = true;
            console.log('Mostrar el paso 4');
            console.log(cuartoPaso);
        } else {
            // Ocultar el paso 4 (Dirección de Envío Diferente)
            $(".step-content[data-step='4']").fadeOut();
            console.log('Ocultar el paso 4');
            cuartoPaso = false;
            console.log(cuartoPaso);
        }
    });

    // Mostrar u ocultar el paso 4 cuando se cargue la página, dependiendo de si está marcada la opción
    if ($('input[name="ship_to_different_address"]').prop('checked')) {
        $(".step-content[data-step='4']").fadeIn();
    } else {
        $(".step-content[data-step='4']").fadeOut();
    }
});
