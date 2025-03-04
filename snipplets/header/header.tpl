{# Site Overlay #}
<div class="js-overlay site-overlay" style="display: none;"></div>

{# leren-doc

Este bloque describe la funcionalidad principal del archivo .tpl.

### Propósito
Este archivo se encarga de renderizar la plantilla de productos, incluyendo el título, descripción y precio.

### Uso
- Se incluye en la página principal del producto.
- Renderiza dinámicamente los datos del producto proporcionados por el backend.

### Notas
Asegúrate de que las variables `product.title`, `product.description` y `product.price` estén definidas.

#}

{# Header #}

{# Header logo dynamic classes #}

{# Prueba de schedule #}

{% set header_logo_mobile_classes = settings.logo_position_mobile == 'center' ? 'head-logo-center' : 'head-logo-left' %}
{% set header_logo_desktop_classes = settings.logo_position_desktop == 'center' ? 'head-logo-md-center' : 'head-logo-md-left' %}
{% set header_colors_classes = settings.header_colors ? 'head-colors' : '' %}
{% set header_search_full_mobile_classes = settings.search_big_mobile and settings.search_full ? 'head-search-full' : '' %}
{% set header_desktop_and_nav_colors_classes = settings.desktop_nav_colors and settings.header_colors ? 'head-desktop-and-nav-colors' : '' %}
{% set header_desktop_nav_colors_classes = settings.desktop_nav_colors ? 'head-desktop-nav-colors' : '' %}
{% set header_desktop_nav_categories_link_classes = settings.category_item ? 'head-desktop-categories-link' : '' %}

{# Logo mobile dynamic classes #}

{% set logo_mobile_classes = settings.logo_position_mobile == 'center' ? 'text-center' : 'ml-2 ml-md-0 text-left' %}

{# Logo desktop dynamic classes + utilities desktop order #}

{% set logo_desktop_classes = settings.logo_position_desktop == 'center' ? 'col-md-6 order-md-1 text-md-center' : 'col-md-3 order-md-first text-md-left' %}

{# Header position type #}

{% set head_position_mobile = 'position-sticky' %}
{% set head_position_desktop = settings.head_fix_desktop ? 'position-fixed-md' : 'position-relative-md' %}

{# Header visibility classes #}

{% set show_inline_desktop_hide_mobile_class = 'd-none d-md-inline-block' %}
{% set show_inline_mobile_hide_desktop_class = 'd-inline-block d-md-none' %}
{% set show_block_desktop_hide_mobile_class = 'd-none d-md-block' %}
{% set show_block_mobile_hide_desktop_class = 'd-block d-md-none' %}

{# Utilities conditions #}

{% set show_whatsapp_button = store.whatsapp and settings.whatsapp_header_link %}
{% set hamburger_icon_alone = settings.logo_position_mobile == 'left' or (settings.logo_position_mobile == 'center' and not show_whatsapp_button and settings.search_big_mobile) %}

{# Header banners #}

{% set has_head_banner_1 = settings.head_informative_banner_01_show and (settings.head_informative_banner_01_title or (settings.head_informative_banner_01_link_text and settings.head_informative_banner_01_url)) %}
{% set has_head_banner_2 = settings.head_informative_banner_02_show and (settings.head_informative_banner_02_title or (settings.head_informative_banner_02_link_text and settings.head_informative_banner_02_url)) %}
{% set has_header_banners = has_head_banner_1 or has_head_banner_2 %}

{# leren-doc 

Mas informacion test

Aca se genera mas informacion del archivo

#}

<header class="js-head-main head-main {{ header_colors_classes }} {{ head_position_mobile }} {{ head_position_desktop }} {{ header_logo_mobile_classes }} {{ header_logo_desktop_classes }} {{ header_search_full_mobile_classes }} {{ header_desktop_and_nav_colors_classes }} {{ header_desktop_nav_colors_classes }} {{ header_desktop_nav_categories_link_classes }} transition-soft" data-store="head">
    {# Adversiting bar #}
    {% if settings.ad_bar %}
        {% snipplet "header/header-advertising.tpl" %}
    {% endif %}
    <div class="head-logo-row position-relative container-fluid">
        <div class="{% if not settings.head_fix_desktop %}js-nav-logo-bar{% endif %} row no-gutters align-items-center">

            {# Menu icon #}

            {# leren-doc-start #}
            
            <div class="{% if settings.search_big_mobile and settings.logo_position_mobile == 'center' and not show_whatsapp_button %}col-2{% else %}col-auto{% endif %} col-utility d-md-none">
                {% include "snipplets/header/header-utilities.tpl" with {use_menu: true} %}
            </div>
            {# leren-doc-end #}

            {# Account icon #}

            {% if settings.search_big_mobile or (not settings.search_big_mobile and not show_whatsapp_button) %}
                <div class="col-auto {{ show_inline_mobile_hide_desktop_class }} {% if hamburger_icon_alone or (settings.logo_position_mobile == 'center' and settings.search_big_mobile) %}order-1{% endif %}">
                    {% include "snipplets/header/header-utilities.tpl" with {use_account: true, icon_only: true} %}
                </div>
            {% endif %}

            {# WhatsApp icon #}

            {# leren-doc [desarrollo:Desarrollo de prueba] [paso:1]
            ## Agregar boton de whatsapp
            
            ### Se muestra el boton de whatsapp
            
            a continuacion un ejemplo del codigo

            #}

            {# leren-doc-start [desarrollo:Desarrollo de prueba] [paso:2] #}

            {% if show_whatsapp_button %}
                <div class="col-auto col-utility {% if settings.logo_position_mobile == 'left' %}order-1{% endif %} order-md-2">
                    {% include "snipplets/header/header-utilities.tpl" with {use_whatsapp: true} %}
                </div>
            {% endif %}

            {# leren-doc-end #}

            {# Logo #}

            <div class="col {{ logo_mobile_classes }} {{ logo_desktop_classes }} {% if hamburger_icon_alone and settings.logo_position_mobile != 'left' %}ml-1 ml-md-0{% endif %}">
                {% set logo_size_class = settings.logo_size == 'small' ? 'logo-img-small' : settings.logo_size == 'big' ? 'logo-img-big' %}
                {{ component('logos/logo', {logo_img_classes: 'transition-soft ' ~ logo_size_class, logo_text_classes: 'h3 m-0'}) }}
            </div>

            {# Search: Icon or box #}

            <div class="col-auto {% if settings.logo_position_desktop == 'center' %}col-md-3{% else %}col-md-6{% endif %} col-utility {% if settings.search_big_mobile %}{{ show_inline_desktop_hide_mobile_class }}{% elseif settings.logo_position_mobile == 'left' %}order-1{% endif %} order-md-0">
                <span class="{{ show_block_desktop_hide_mobile_class }}">
                    {% include "snipplets/header/header-search.tpl" %}
                </span>
                <span class="{{ show_inline_mobile_hide_desktop_class }}">
                    {% include "snipplets/header/header-utilities.tpl" with {use_search: true} %}
                </span>
            </div>

            <div class="col-md col-utility text-right {{ show_inline_desktop_hide_mobile_class }} {% if settings.logo_position_desktop == 'center' %}order-md-1{% endif %}">
                {% include "snipplets/header/header-utilities.tpl" with {use_account: true, header_desktop: true} %}
            </div>

            {# Cart icon #}

            <div class="col-auto col-utility order-2">
                {% include "snipplets/header/header-utilities.tpl" %}
            </div>

            {# Add to cart notification #}

            {% if settings.ajax_cart %}
                {% if not settings.head_fix_desktop %}
                    <div class="{{ show_block_mobile_hide_desktop_class }}">
                {% endif %}
                        {% include "snipplets/notification.tpl" with {add_to_cart: true} %}
                {% if not settings.head_fix_desktop %}
                    </div>
                {% endif %}
            {% endif %}

        </div>
    </div>   

    {% if settings.head_secondary_menu_show %}
        <div class="head-secondary-nav container-fluid {{ show_block_desktop_hide_mobile_class }}">
            {% include "snipplets/navigation/navigation-secondary.tpl" %}
        </div>
    {% endif %}

    {# Mobile search big #}

    {% if settings.search_big_mobile %}
        <div class="js-big-search-mobile {% if settings.search_full %}p-0{% else %}pb-3{% endif %} container-fluid {{ show_block_mobile_hide_desktop_class }}">
            {% include "snipplets/header/header-search.tpl" %}
        </div>
    {% endif %}

    {# Desktop navigation below logo #}

    <div class="js-menu-and-banners-row container-fluid menu-and-banners-row d-none d-md-block">
        <div class="row">
            {% if settings.category_item %}
                {% include 'snipplets/navigation/navigation-categories.tpl' %}
            {% endif %}
            <div class="js-desktop-nav-col col">
                {% snipplet "navigation/navigation.tpl" %}
            </div>
            {% if has_header_banners %}
                <div class="js-head-banners-col col-md-auto">
                    {% include "snipplets/header/header-banners.tpl" %}
                </div>
            {% endif %}
        </div>
    </div>
 
    {% include "snipplets/notification.tpl" with {order_notification: true} %}
</header>



{% if has_header_banners %}
    <div class="container-fluid {{ show_block_mobile_hide_desktop_class }}">
        {% include "snipplets/header/header-banners.tpl" %}
    </div>
{% endif %}

{# Show cookie validation message #}

{% include "snipplets/notification.tpl" with {show_cookie_banner: true} %}

{# Add to cart notification for non fixed header #}

{% if settings.ajax_cart and not settings.head_fix_desktop %}
    <div class="{{ show_block_desktop_hide_mobile_class }}">
        {% include "snipplets/notification.tpl" with {add_to_cart: true, add_to_cart_fixed: true} %}
    </div>
{% endif %}

{% include "snipplets/header/header-modals.tpl" %}
