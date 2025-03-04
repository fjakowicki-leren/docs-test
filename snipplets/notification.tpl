{# Cookie validation #}

{% if show_cookie_banner and not params.preview %}
    <div class="js-notification js-notification-cookie-banner notification notification-fixed-bottom notification-above notification-primary text-left" style="display: none;">
        <div class="container-fluid">
            <div class="row justify-content-center align-items-center">
                <div class="col col-md-auto pr-0">
                    <div class="font-small">{{ 'Al navegar por este sitio <strong>aceptás el uso de cookies</strong> para agilizar tu experiencia de compra.' | translate }}</div>
                </div>
                <div class="col-auto">
                    <a href="#" class="js-notification-close js-acknowledge-cookies btn btn-default btn-small" data-amplitude-event-name="cookie_banner_acknowledge_click">{{ "Entendido" | translate }}</a>
                </div>
            </div>
        </div>
    </div>
{% endif %}

{% if order_notification and status_page_url %}
    <div class="js-notification js-notification-status-page notification notification-primary notification-order w-100 py-2" style="display:none;" data-url="{{ status_page_url }}">
        <div class="container">
            <div class="row">
                <div class="col">
                    <a class="d-block d-sm-inline mr-2" href="{{ status_page_url }}"><span class="btn-link">{{ "Seguí acá" | translate }}</span> {{ "tu última compra" | translate }}</a>
                    <a class="js-notification-close js-notification-status-page-close notification-close position-relative-md" href="#">
                        {% include "snipplets/svg/times.tpl" with {svg_custom_class: "icon-inline"} %}
                    </a>
                </div>
            </div>
        </div>
    </div>
{% endif %}
{% if add_to_cart %}
    <div class="js-alert-added-to-cart notification-floating notification-cart-container notification-hidden notification-fixed position-absolute{% if not settings.head_fix_desktop %} position-fixed-md{% endif %} card" style="display: none;">
        <div class="notification notification-primary notification-cart">
            <div class="js-cart-notification-close notification-close mr-2 mt-2">
                {% include "snipplets/svg/times.tpl" with {svg_custom_class: "icon-inline icon-lg notification-icon"} %}
            </div>
            <div class="js-cart-notification-item row no-gutters" data-store="cart-notification-item">
                <div class="col-auto pr-0 notification-img">
                    <img src="" class="js-cart-notification-item-img img-absolute-centered-vertically" />
                </div>
                <div class="col text-left py-2 pl-2 font-small">
                    <div class="mb-1 mr-4">
                        <span class="js-cart-notification-item-name"></span>
                        <span class="js-cart-notification-item-variant-container" style="display: none;">
                            (<span class="js-cart-notification-item-variant"></span>)
                        </span>
                    </div>
                    <div class="mb-1">
                        <span class="js-cart-notification-item-quantity"></span>
                        <span> x </span>
                        <span class="js-cart-notification-item-price"></span>
                    </div>
                    <strong>{{ '¡Agregado al carrito con éxito!' | translate }}</strong>
                </div>
            </div>
        </div>
    </div>
{% endif %}
