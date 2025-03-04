{% set has_banner = has_banner | default(false) %}
{% set has_banner_promotional = has_banner_promotional | default(false) %}
{% set has_banner_news = has_banner_news | default(false) %}

{% if has_banner %}
    {% set data_store_name = 'categories' %}
    {% set section_name = 'banner' %}
    {% set section_format = settings.banner_slider ? 'slider' : 'grid' %}
    {% set section_columns_mobile = settings.banner_columns_mobile %}
    {% set section_columns_desktop = settings.banner_columns_desktop %}
    {% set section_grid_classes = settings.banner_columns_desktop == 4 ? 'col-md-3' : settings.banner_columns_desktop == 3 ? 'col-md-4' : settings.banner_columns_desktop == 2 ? 'col-md-6' : 'col-md-12' %}
    {% set section_text_position = settings.banner_text_outside ? 'outside' : 'above' %}
    {% set section_image_size = settings.banner_same_size ? 'same' : 'original' %}
    {% set section_margin = settings.banner_without_margins ? 'false' : 'true' %}
{% elseif has_banner_promotional %}
    {% set data_store_name = 'promotional' %}
    {% set section_name = 'banner-promotional' %}
    {% set section_format = settings.banner_promotional_slider ? 'slider' : 'grid' %}
    {% set section_columns_mobile = settings.banner_promotional_columns_mobile %}
    {% set section_columns_desktop = settings.banner_promotional_columns_desktop %}
    {% set section_grid_classes = settings.banner_promotional_columns_desktop == 4 ? 'col-md-3' : settings.banner_promotional_columns_desktop == 3 ? 'col-md-4' : settings.banner_promotional_columns_desktop == 2 ? 'col-md-6' : 'col-md-12' %}
    {% set section_text_position = settings.banner_promotional_text_outside ? 'outside' : 'above' %}
    {% set section_image_size = settings.banner_promotional_same_size ? 'same' : 'original' %}
    {% set section_margin = settings.banner_promotional_without_margins ? 'false' : 'true' %}
{% else %}
    {% set data_store_name = 'news' %}
    {% set section_name = 'banner-news' %}
    {% set section_format = settings.banner_news_slider ? 'slider' : 'grid' %}
    {% set section_columns_mobile = settings.banner_news_columns_mobile %}
    {% set section_columns_desktop = settings.banner_news_columns_desktop %}
    {% set section_grid_classes = settings.banner_news_columns_desktop == 4 ? 'col-md-3' : settings.banner_news_columns_desktop == 3 ? 'col-md-4' : settings.banner_news_columns_desktop == 2 ? 'col-md-6' : 'col-md-12' %}
    {% set section_text_position = settings.banner_news_text_outside ? 'outside' : 'above' %}
    {% set section_image_size = settings.banner_news_same_size ? 'same' : 'original' %}
    {% set section_margin = settings.banner_news_without_margins ? 'false' : 'true' %}
{% endif %}

{% if has_banner or has_banner_promotional or has_banner_news %}
    <div class="js-home-{{ section_name }}" data-format="{{ section_format }}" data-mobile-columns="{{ section_columns_mobile }}" data-desktop-columns="{{ section_columns_desktop }}" data-grid-classes="{{ section_grid_classes }}" data-text="{{ section_text_position }}" data-image="{{ section_image_size }}" data-margin="{{ section_margin }}">
        {% if has_banner %}
            {% include 'snipplets/home/home-banners-grid.tpl' with {'banner': true} %}
        {% endif %}
        {% if has_banner_promotional %}
            {% include 'snipplets/home/home-banners-grid.tpl' with {'banner_promotional': true} %}
        {% endif %}
        {% if has_banner_news %}
            {% include 'snipplets/home/home-banners-grid.tpl' with {'banner_news': true} %}
        {% endif %}
    </div>
{% endif %}
