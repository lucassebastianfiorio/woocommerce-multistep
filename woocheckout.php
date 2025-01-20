<?php
/**
 * Plugin Name: Checkout WooCommerce Personalizado
 * Description: Reemplaza la página de checkout de WooCommerce con un archivo personalizado.
 * Version: 1.2
 * Author: Lucas S. Fiorio
 */

if (!defined('ABSPATH')) {
    exit; // Evitar acceso directo
}

// Hook para sobrescribir la plantilla de checkout
add_filter('template_include', 'mi_personalizar_checkout', 99);

function mi_personalizar_checkout($template) {
    if (is_checkout()) {
        // Ruta del archivo personalizado
        $custom_template = plugin_dir_path(__FILE__) . 'templates/custom-checkout.php';

        // Verifica si el archivo existe
        if (file_exists($custom_template)) {
            return $custom_template;
        }
    }

    return $template;
}

// Hook para cargar estilos y scripts
add_action('wp_enqueue_scripts', 'mi_plugin_checkout_scripts');

function mi_plugin_checkout_scripts() {
    if (is_checkout()) {
        wp_enqueue_style('mi-plugin-checkout-style', plugin_dir_url(__FILE__) . 'assets/style.css');
        wp_enqueue_script('mi-plugin-checkout-script', plugin_dir_url(__FILE__) . 'assets/script.js', ['jquery'], '1.0', true);
    }
}
