<?php

/**
 * Checkout personalizado multistep
 */

if (!defined('ABSPATH')) {
    exit; // Evitar acceso directo
}

// Inicializa la variable $checkout
$checkout = WC()->checkout;

// Si el carrito está vacío, redirigir a la página de la tienda
if (!WC()->cart->get_cart_contents_count()) {
    wp_redirect(wc_get_page_permalink('shop'));
    exit;
}

get_header(); ?>

<div class="custom-checkout-container">
    <h1>Checkout Multistep</h1>

    <div id="checkout-steps">
        <!-- Indicador de pasos -->
        <ul id="steps-indicator">
            <li class="active">Paso 1: Facturación</li>
            <li data-step="2">Paso 2: Envío</li>
            <li data-step="3">Paso 3: Pago</li>
        </ul>

        <!-- Formulario -->
        <form name="checkout" method="post" class="checkout woocommerce-checkout" action="<?php echo esc_url(wc_get_checkout_url()); ?>" enctype="multipart/form-data">
            <!-- Paso 1: Facturación -->
            <div class="step-content" data-step="1">
                <h2>Información de Facturación</h2>
                <div class="woocommerce-billing-fields">
                    <?php
                    // Mostrar solo los campos de nombre, apellidos, teléfono y email
                    $fields = $checkout->get_checkout_fields('billing');
                    foreach (['billing_first_name', 'billing_last_name', 'billing_phone', 'billing_email'] as $field_key) {
                        woocommerce_form_field($field_key, $fields[$field_key], $checkout->get_value($field_key));
                    }
                    ?>
                </div>
                <button type="button" class="facturacion">Siguiente</button>
            </div>

            <!-- Paso 2: Envío -->
            <div class="step-content" data-step="2" style="display: none;">
                <h2>Información de Envío</h2>
                <div class="woocommerce-shipping-fields">
                    <?php
                    // Mostrar los campos de dirección, país, ciudad, etc.
                    $fields = $checkout->get_checkout_fields('shipping');
                    foreach ($fields as $key => $field) {
                        woocommerce_form_field($key, $field, $checkout->get_value($key));
                    }
                    ?>
                </div>
                <div class="woocommerce-additional-fields">
                    <?php
                    // Mostrar las notas del pedido
                    foreach ($checkout->get_checkout_fields('order') as $key => $field) {
                        woocommerce_form_field($key, $field, $checkout->get_value($key));
                    }
                    ?>
                </div>
                <div class="woocommerce-shipping-fields direccion-diferente">
                    <?php
                    // Mostrar la opción de enviar a una dirección diferente
                    woocommerce_form_field('ship_to_different_address', array(
                        'type' => 'checkbox',
                        'class' => array('form-row-wide'),
                        'label' => __('¿Enviar a una dirección diferente?'),
                    ), $checkout->get_value('ship_to_different_address'));
                    ?>
                </div>
                

                <div class="step-content" data-step="4" style="display: <?php echo (isset($_POST['ship_to_different_address']) && $_POST['ship_to_different_address'] == '1') ? 'block' : 'none'; ?>;">
                    <h2>Dirección de Envío Diferente</h2>
                    <div class="woocommerce-shipping-fields">
                        <?php
                        // Mostrar los campos de dirección, país, ciudad, etc. para la dirección de envío diferente
                        $fields = $checkout->get_checkout_fields('shipping');
                        foreach ($fields as $key => $field) {
                            woocommerce_form_field($key, $field, $checkout->get_value($key));
                        }
                        ?>
                    </div>
                </div>
                <button type="button" class="prev-step">Anterior</button>
                <button type="button" class="next-step">Siguiente</button>
            </div>

            <!-- Paso 3: Pago -->
            <div class="step-content" data-step="3" style="display: none;">
                <h2>Método de Pago</h2>
                <div id="order_review" class="woocommerce-checkout-review-order">
                    <?php do_action('woocommerce_checkout_order_review'); ?>
                </div>
                <button type="button" class="prev-step">Anterior</button>
                <button type="submit" class="place-order">Realizar Pedido</button>
            </div>




        </form>
    </div>
</div>


<?php get_footer(); ?>