{% set has_filters_available = products and has_filters_enabled and (filter_categories is not empty or product_filters is not empty) %}

{# Only remove this if you want to take away the theme onboarding advices #}
{% set show_help = not has_products %}

{% if settings.pagination == 'infinite' %}
	{% paginate by 12 %}
{% else %}
	{% if settings.grid_columns_desktop == '5' %}
		{% paginate by 50 %}
	{% else %}
		{% paginate by 48 %}
	{% endif %}
{% endif %}

{% if not show_help %}

{% set category_banner = (category.images is not empty) or ("banner-products.jpg" | has_custom_image) %}
{% set has_category_description_without_banner = not category_banner and category.description %}
{% set page_header_classes = has_category_description_without_banner ? 'pt-3 pt-md-4' : '' %}
{% set page_header_padding = has_category_description_without_banner ? false : true %}

{% if category_banner %}
    {% include 'snipplets/category-banner.tpl' %}
{% endif %}

<div class="background-secondary mb-md-3">
	<div class="container">
		<div class="row align-items{% if category_banner %}-center{% else %}-end{% endif %}">
			<div class="col">
				{% if category_banner %}
					{% include 'snipplets/breadcrumbs.tpl' with {breadcrumbs_custom_class: 'mb-0' } %}
				{% else %}
					{% embed "snipplets/page-header.tpl" with {container: false, padding: page_header_padding, page_header_class: page_header_classes} %}
					    {% block page_header_text %}{{ category.name }}{% endblock page_header_text %}
					{% endembed %}
					{% if category.description %}
						<p class="mt-2 mb-md-4 mb-3">{{ category.description }}</p>
					{% endif %}
				{% endif %}
			</div>
			{% if products %}
				<div class="col-auto py-3 py-md-4">
					<a href="#" class="js-modal-open btn-link d-none d-md-block" data-toggle="#sort-by">
						<div class="d-flex justify-content-center align-items-center">
							{% include "snipplets/svg/sort.tpl" with { svg_custom_class: "icon-inline mr-2"} %}
							{{ 'Ordenar' | t }}
						</div>
					</a>
					{% if products | length > 1 %}
						<div class="d-md-none text-right font-small mb-1">
							{{ products_count }} {{ 'productos' | translate }}
						</div>
					{% endif %}
				</div>
			{% endif %}
		</div>
	</div>
</div>

<section class="js-category-controls category-controls visible-when-content-ready d-md-none background-secondary">
	<div class="container category-controls-container">
		<div class="category-controls-row row">
			{% if products %}
				<div class="col category-control-item">
					<a href="#" class="js-modal-open d-block text-uppercase font-weight-bold font-small" data-toggle="#sort-by">
						<div class="d-flex justify-content-center align-items-center">
							{% include "snipplets/svg/sort.tpl" with { svg_custom_class: "icon-inline mr-2"} %}
							{{ 'Ordenar' | t }}
						</div>
					</a>
					{% embed "snipplets/modal.tpl" with{modal_id: 'sort-by', modal_class: 'bottom modal-centered modal-bottom-sheet modal-right-md', modal_position: 'bottom', modal_position_desktop: right, modal_width: 'docked-md', modal_transition: 'slide', modal_header_title: true} %}
						{% block modal_head %}
							{{'Ordenar' | translate }}
						{% endblock %}
						{% block modal_body %}
							{% include 'snipplets/grid/sort-by.tpl' with { list: "true"} %}
							<div class="js-sorting-overlay filters-overlay" style="display: none;">
								<div class="filters-updating-message">
									<span class="h5 mr-2">{{ 'Ordenando productos' | translate }}</span>
									<span>
										{% include "snipplets/svg/circle-notch.tpl" with {svg_custom_class: "icon-inline h5 icon-spin svg-icon-text"} %}
									</span>
								</div>
							</div>
						{% endblock %}
					{% endembed %}
				</div>
			{% endif %}
			{% if has_filters_available %}
				<div class="visible-when-content-ready col category-control-item">
					<a href="#" class="js-modal-open js-fullscreen-modal-open d-block text-uppercase font-weight-bold font-small" data-toggle="#nav-filters" data-modal-url="modal-fullscreen-filters" data-component="filter-button">
						<div class="d-flex justify-content-center align-items-center">
							{% include "snipplets/svg/filter.tpl" with { svg_custom_class: "icon-inline mr-2"} %}
							{{ 'Filtrar' | t }}
						</div>
					</a>
					{% embed "snipplets/modal.tpl" with{modal_id: 'nav-filters', modal_class: 'filters', modal_body_class: 'h-100 p-0', modal_position: 'right', modal_position_desktop: right, modal_transition: 'slide', modal_header_title: true, modal_width: 'docked-md', modal_mobile_full_screen: 'true' } %}
						{% block modal_head %}
							{{'Filtros ' | translate }}
						{% endblock %}
						{% block modal_body %}
							{% if has_filters_available %}
								{% if filter_categories is not empty %}
									{% include "snipplets/grid/categories.tpl" with {modal: true} %}
								{% endif %}
								{% if product_filters is not empty %}
							   		{% include "snipplets/grid/filters.tpl" with {modal: true} %}
							   	{% endif %}
								<div class="js-filters-overlay filters-overlay" style="display: none;">
									<div class="filters-updating-message">
										<span class="js-applying-filter h5 mr-2" style="display: none;">{{ 'Aplicando filtro' | translate }}</span>
										<span class="js-removing-filter h5 mr-2" style="display: none;">{{ 'Borrando filtro' | translate }}</span>
										<span class="js-filtering-spinner" style="display: none;">
											{% include "snipplets/svg/circle-notch.tpl" with {svg_custom_class: "icon-inline h5 icon-spin svg-icon-text"} %}
										</span>
									</div>
								</div>
							{% endif %}
						{% endblock %}
					{% endembed %}
				</div>
			{% endif %}
		</div>
	</div>
</section>
<section class="js-category-controls-prev category-controls-sticky-detector"></section>

<section class="category-body" data-store="category-grid-{{ category.id }}">
	<div class="container {% if has_applied_filters %}mt-md-0{% endif %} mt-3 mb-5">
		<div class="row">
			{% if has_applied_filters %}
				<div class="col-12 mb-3 mb-md-4 d-flex justify-content-md-end align-items-center visible-when-content-ready">
					{% include "snipplets/grid/filters.tpl" with {applied_filters: true} %}
				</div>
			{% endif %}
			{% if has_filters_available %} 
				<div class="col-md-auto filters-sidebar d-none d-md-block visible-when-content-ready">
					{% if products %}
						{% if filter_categories is not empty %}
							{% include "snipplets/grid/categories.tpl" %}
						{% endif %}
						{% if product_filters is not empty %}	   
							{% include "snipplets/grid/filters.tpl" %}
						{% endif %}
					{% endif %}
				</div>
			{% endif %}
			<div class="col" data-store="category-grid-{{ category.id }}">
				{% if products %}
					<div class="js-product-table row row-grid">
						{% include 'snipplets/product_grid.tpl' %}
					</div>
					{% if settings.pagination == 'infinite' %}
						{% set pagination_type_val = true %}
					{% else %}
						{% set pagination_type_val = false %}
					{% endif %}

					{% include "snipplets/grid/pagination.tpl" with {infinite_scroll: pagination_type_val} %}
				{% else %}
					<div class="h6 text-center" data-component="filter.message">
						{{(has_filters_enabled ? "No tenemos resultados para tu búsqueda. Por favor, intentá con otros filtros." : "Próximamente") | translate}}
					</div>
				{% endif %}
			</div>
		</div>
	</div>
</section>
{% elseif show_help %}
	{# Category Placeholder #}
	{% include 'snipplets/defaults/show_help_category.tpl' %}
{% endif %}