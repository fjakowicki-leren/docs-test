<div class="js-ajax-cart-list card">
    {# Cart panel items #}
    {% if cart.items %}
      {% for item in cart.items %}
        {% include "snipplets/cart-item-ajax.tpl" %}
      {% endfor %}
    {% endif %}
</div>
<div class="js-empty-ajax-cart" {% if cart.items_count > 0 %}style="display:none;"{% endif %}>
 	{# Cart panel empty #}
    <div class="alert alert-info text-center" data-component="cart.empty-message">{{ "El carrito de compras está vacío." | translate }} </div>
</div>
<div id="error-ajax-stock" style="display: none;">
	<div class="alert alert-warning m-3">
     	{{ "¡Uy! No tenemos más stock de este producto para agregarlo al carrito. Si querés podés" | translate }}<a href="{{ store.products_url }}" class="btn-link font-small ml-1">{{ "ver otros acá" | translate }}</a>
    </div>
</div>

<div class="cart-row">
    {% include "snipplets/cart-totals.tpl" %}
</div>

