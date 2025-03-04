{% if options %}
    
    {% if store.show_shipping_emergency_message %}
        <div class="alert alert-warning mb-4">{{ store.shipping_emergency_message }}</div> 
    {% endif %}

    <div class="{% if cart.items_count > 0 and not cart.free_shipping.cart_has_free_shipping %}js-product-shipping-label{% endif %} font-small mb-4" style="display: none;">
        {{ 'Opciones para tu compra <strong>si sumás este producto</strong>.' | translate }}
    </div>

    {# Check for only delivery featured options #}

    {% set has_featured_shipping = false %}

    {% for option in options_to_show if option.shipping_type == 'ship' or option.shipping_type == 'delivery' or (option.method == 'table' and option.shipping_type == 'custom') %}
        {% if option |length >= 1 %}
            {% set has_featured_shipping = true %}
        {% endif %}
    {% endfor %}

    {# Check for only non featured delivery options #}

    {% set has_non_featured_shipping = false %}

    {% for option in options_to_hide if option.shipping_type == 'ship' or option.shipping_type == 'delivery' or (option.method == 'table' and option.shipping_type == 'custom') %}
        {% if option |length >= 1 %}
            {% set has_non_featured_shipping = true %}
        {% endif %}
    {% endfor %}

    {# Pickup featured options #}

    {% set has_non_featured_pickup = false %}
    {% set has_featured_pickup = false %}

    {# Check for only pickup featured options #}

    {% for option in options_to_show if option.shipping_type == 'pickup' and option.method != 'branch' %}
        {% if option |length >= 1 %}
            {% set has_featured_pickup = true %}
        {% endif %}
    {% endfor %}

    {# Check for only non featured pickup options #}

    {% for option in options_to_hide if option.shipping_type == 'pickup' and option.method != 'branch' %}
        {% if option |length >= 1 %}
            {% set has_non_featured_pickup = true %}
        {% endif %}
    {% endfor %}

    {# Shipping options #}

    {% if has_featured_shipping %}

        <div class="font-small mb-3">
            {% include "snipplets/svg/truck.tpl" with {svg_custom_class: "icon-inline svg-icon-text mr-2 align-middle"} %}
            {{ "Envío a domicilio" | translate }}
        </div>

        
        <ul class="radio-button-container list-unstyled mb-4">

            {# List only delivery featured options #}

            {% for option in options_to_show if option.shipping_type == 'ship' or option.shipping_type == 'delivery' or (option.method == 'table' and option.shipping_type == 'custom') %}
                {% include "snipplets/shipping/shipping-calculator-item.tpl" with {'featured_option': true} %}
            {% endfor %}

            {% if has_non_featured_shipping %}

                <div class="js-other-shipping-options float-left w-100" style="display: none;">

                    {# List only delivery non featured options #}

                    {% for option in options_to_hide if option.shipping_type == 'ship' or option.shipping_type == 'delivery' or (option.method == 'table' and option.shipping_type == 'custom') %}
                        {% include "snipplets/shipping/shipping-calculator-item.tpl" %}
                    {% endfor %}
                </div>

                <div class="js-toggle-more-shipping-options js-show-more-shipping-options d-inline-block w-100 my-3 text-center">
                    <a href="#" class="btn-link font-small">
                        <span class="js-shipping-see-more">
                            {{ 'Ver más opciones de envío' | translate }}
                        </span>
                        <span class="js-shipping-see-less" style="display: none;">
                            {{ 'Ver menos opciones de envío' | translate }}
                        </span>
                    </a>
                </div>
                

            {% endif %}

        </ul>

    {% endif %}

    {# Pickup options #}

    {% if has_featured_pickup %}

        <div class="font-small mb-3">
            {% include "snipplets/svg/map-marker-alt.tpl" with {svg_custom_class: "icon-inline icon-lg svg-icon-text mr-2"} %}
            {{ "Retirar por" | translate }}
        </div>

        <ul class="radio-button-container list-unstyled mb-4">

            {# List only pickup featured options #}

            {% for option in options_to_show if option.shipping_type == 'pickup' and option.method != 'branch' %}
                {% include "snipplets/shipping/shipping-calculator-item.tpl" with {'featured_option': true, 'pickup' : true} %}
            {% endfor %}

            {% if has_non_featured_pickup %}

                <div class="js-other-pickup-options list-unstyled p-0 w-100" style="display: none;">

                    {# List only pickup non featured options #}

                    {% for option in options_to_hide if option.shipping_type == 'pickup' and option.method != 'branch' %}
                        {% include "snipplets/shipping/shipping-calculator-item.tpl" with {'pickup' : true}  %}
                    {% endfor %}
                </div>

                <div class="js-toggle-more-shipping-options js-show-other-pickup-options d-inline-block w-100 my-3 text-center">
                    <a href="#" class="btn-link font-small">
                        <span class="js-shipping-see-more">
                            {{ 'Ver más opciones de retiro' | translate }}
                        </span>
                        <span class="js-shipping-see-less" style="display: none;">
                            {{ 'Ver menos opciones de retiro' | translate }}
                        </span>
                    </a>
                </div>

            {% endif %}
        </ul>

    {% endif %}

    {% if store.has_smart_dates and show_time %}
        <div class="font-small mb-3">{{"El tiempo de entrega <strong>no considera feriados</strong>." | translate}}</div>
    {% endif %}
{% else %}
<span>{{"No hay costos de envío para el código postal dado." | translate}}</span>
{% endif %}

{# Don't remove this #}
<input type="hidden" name="after_calculation" value="1"/>
<input type="hidden" name="zipcode" value="{{zipcode}}"/>
