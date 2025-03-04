{# /*============================================================================
  #Page header
==============================================================================*/

#Properties

#Title

#Breadcrumbs

#}

{% set padding = padding ?? true %}
{% set container = container ?? true %}

{% if container %}
<div class="background-secondary mb-4">
	<div class="container">
{% endif %}
		<section class="page-header {% if padding %}py-3 py-md-4{% endif %} {{ page_header_class }}" data-store="page-title">
			{% include 'snipplets/breadcrumbs.tpl' %}
			<h1 class="{{ page_header_title_class }}" {% if template == "product" %}data-store="product-name-{{ product.id }}"{% endif %}>{% block page_header_text %}{% endblock %}</h1>
		</section>
{% if container %}
	</div>
</div>
{% endif %}
