id: desarrollo_de_prueba


## Agregar boton de whatsapp
### Se muestra el boton de whatsapp
a continuacion un ejemplo del codigo


```twig


{% if show_whatsapp_button %}
    <div class="col-auto col-utility {% if settings.logo_position_mobile == 'left' %}order-1{% endif %} order-md-2">
        {% include "snipplets/header/header-utilities.tpl" with {use_whatsapp: true} %}
    </div>
{% endif %}


```


## Paso final