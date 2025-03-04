id: header_tpl


### Propósito
Este archivo se encarga de renderizar la plantilla de productos, incluyendo el título, descripción y precio.
### Uso
- Se incluye en la página principal del producto.
- Renderiza dinámicamente los datos del producto proporcionados por el backend.
### Notas
Asegúrate de que las variables `product.title`, `product.description` y `product.price` estén definidas.


Aca se genera mas informacion del archivo


```twig


<div class="{% if settings.search_big_mobile and settings.logo_position_mobile == 'center' and not show_whatsapp_button %}col-2{% else %}col-auto{% endif %} col-utility d-md-none">
    {% include "snipplets/header/header-utilities.tpl" with {use_menu: true} %}
</div>

```