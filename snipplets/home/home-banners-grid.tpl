{% set banner = banner | default(false) %}
{% set banner_promotional = banner_promotional | default(false) %}
{% set banner_news = banner_news | default(false) %}

{% if banner %}
    {% set section_banner = settings.banner %}
    {% set section_title = settings.banner_title %}
    {% set section_slider = settings.banner_slider %}
    {% set section_id = 'banners' %}
    {% set section_columns_mobile_2 = settings.banner_columns_mobile == 2 %}
    {% set section_columns_desktop_4 = settings.banner_columns_desktop == 4 %}
    {% set section_columns_desktop_3 = settings.banner_columns_desktop == 3 %}
    {% set section_columns_desktop_2 = settings.banner_columns_desktop == 2 %}
    {% set section_columns_desktop_1 = settings.banner_columns_desktop == 1 %}
    {% set section_same_size = settings.banner_same_size %}
    {% set section_without_margins = settings.banner_without_margins %}
    {% set section_text_outside = settings.banner_text_outside %}
{% endif %}
{% if banner_promotional %}
    {% set section_banner = settings.banner_promotional %}
    {% set section_title = settings.banner_promotional_title %}
    {% set section_slider = settings.banner_promotional_slider %}
    {% set section_id = 'banners-promotional' %}
    {% set section_columns_mobile_2 = settings.banner_promotional_columns_mobile == 2 %}
    {% set section_columns_desktop_4 = settings.banner_promotional_columns_desktop == 4 %}
    {% set section_columns_desktop_3 = settings.banner_promotional_columns_desktop == 3 %}
    {% set section_columns_desktop_2 = settings.banner_promotional_columns_desktop == 2 %}
    {% set section_columns_desktop_1 = settings.banner_promotional_columns_desktop == 1 %}
    {% set section_same_size = settings.banner_promotional_same_size %}
    {% set section_without_margins = settings.banner_promotional_without_margins %}
    {% set section_text_outside = settings.banner_promotional_text_outside %}
{% endif %}
{% if banner_news %}
    {% set section_banner = settings.banner_news %}
    {% set section_title = settings.banner_news_title %}
    {% set section_slider = settings.banner_news_slider %}
    {% set section_id = 'banners-news' %}
    {% set section_columns_mobile_2 = settings.banner_news_columns_mobile == 2 %}
    {% set section_columns_desktop_4 = settings.banner_news_columns_desktop == 4 %}
    {% set section_columns_desktop_3 = settings.banner_news_columns_desktop == 3 %}
    {% set section_columns_desktop_2 = settings.banner_news_columns_desktop == 2 %}
    {% set section_columns_desktop_1 = settings.banner_news_columns_desktop == 1 %}
    {% set section_same_size = settings.banner_news_same_size %}
    {% set section_without_margins = settings.banner_news_without_margins %}
    {% set section_text_outside = settings.banner_news_text_outside %}
{% endif %}

<div class="js-banner-container container">
    <div class="row">
        <div class="col-12">
            <h2 class="js-{{ section_id }}-title section-title h3 mb-3"{% if not section_title %} style="display:none;"{% endif %}>{{ section_title }}</h2>
        </div>
    </div>
{% if section_without_margins %}
</div>
<div class="js-banner-container container-fluid p-0 overflow-none">
{% endif %}
    <div class="row">
        <div class="js-banner-col col-12{% if section_slider and not section_without_margins %} pr-0 pr-md-3{% endif %}">
            {% if section_slider %}
                <div class="js-swiper-{{ section_id }} swiper-container{% if not section_without_margins %} pb-1 pl-1{% endif %}">
                    <div class="js-banner-row swiper-wrapper">
            {% else %}
                <div class="js-banner-row row {% if section_without_margins %}no-gutters{% else %}px-2{% endif %}">
            {% endif %}

            {% for slide in section_banner %}

                {% set has_banner_text = slide.title or slide.description or slide.button %}

                <div class="js-banner {% if section_slider %}swiper-slide {% else %}col-grid {% if section_columns_mobile_2 %}col-6 {% endif %}{% if section_columns_desktop_4 %}col-md-3{% elseif section_columns_desktop_3 %}col-md-4{% elseif section_columns_desktop_2 %}col-md-6{% elseif section_columns_desktop_1 %}col-md-12{% endif %}{% endif %}">
                    <div class="js-textbanner textbanner{% if section_text_outside %} background-secondary{% endif %}{% if section_without_margins %} textbanner-unstyled m-0{% endif %}">
                        {% if slide.link %}
                            <a href="{{ slide.link | setting_url }}" class="textbanner-link" aria-label="{{ 'Carrusel' | translate }} {{ loop.index }}">
                        {% endif %}
                        <div class="js-textbanner-image-container textbanner-image{% if not section_same_size %} p-0{% endif %}{% if has_banner_text and not section_text_outside %} overlay{% endif %} overflow-none">
                            <img {% if slide.width and slide.height %} width="{{ slide.width }}" height="{{ slide.height }}" {% endif %} src="{% if not section_slider %}{{ 'images/empty-placeholder.png' | static_url }}{% endif %}" data-sizes="auto" data-expand="-10" data-srcset="{{ slide.image | static_url | settings_image_url('large') }} 480w, {{ slide.image | static_url | settings_image_url('huge') }} 640w, {{ slide.image | static_url | settings_image_url('original') }} 1024w, {{ slide.image | static_url | settings_image_url('1080p') }} 1920w" class="js-textbanner-image textbanner-image-effect {% if section_same_size %}textbanner-image-background{% else %}img-fluid d-block w-100{% endif %} lazyautosizes lazyload fade-in" {% if slide.title %}alt="{{ banner_title }}"{% else %}alt="{{ 'Banner de' | translate }} {{ store.name }}"{% endif %} />
                            <div class="placeholder-fade placeholder-banner"></div>
                        {% if section_text_outside %}
                            </div>
                        {% endif %}
                        {% if has_banner_text %}
                            <div class="js-textbanner-text textbanner-text {% if section_columns_mobile_2 %}textbanner-text-small{% endif %} {% if not section_text_outside %} over-image{% if section_columns_desktop_1 %} w-md-50{% endif %}{% endif %} {% if not section_text_outside and slide.color == 'light' %}over-image-invert{% endif %}">
                                {% if slide.title %}
                                    <h3 class="{% if section_columns_mobile_2 %}h5 h3-md{% endif %} {% if section_columns_desktop_2 or section_columns_desktop_1 %}h1-md{% elseif section_columns_desktop_3 %}h2-md{% endif %}{% if slide.description or (slide.button and slide.link) %} mb-1 mb-md-2{% else %} mb-0{% endif %}">{{ slide.title }}</h3>
                                {% endif %}
                                {% if slide.description %}
                                    <div class="textbanner-paragraph font-small font-md-body{% if slide.button and slide.link %} mb-1 mb-md-2{% endif %}">{{ slide.description }}</div>
                                {% endif %}
                                {% if slide.button and slide.link %}
                                    <div class="btn btn-default btn-smallest mt-1 mt-md-2">{{ slide.button }}</div>
                                {% endif %}
                            </div>
                        {% endif %}
                        {% if not section_text_outside %}
                            </div>
                        {% endif %}
                        {% if slide.link %}
                            </a>
                        {% endif %}
                    </div>
                </div>
            {% endfor %}
            {% if section_slider %}
                    </div>
                </div>
                {% if section_banner and section_banner is not empty %}
                    {% set section_arrows_class = section_without_margins ? 'mx-2 svg-icon-invert' : 'swiper-button-outside svg-icon-text' %}
                    <div class="js-swiper-{{ section_id }}-prev swiper-button-prev {{ section_arrows_class }} d-none d-md-block">{% include "snipplets/svg/chevron-left.tpl" with {svg_custom_class: "icon-inline icon-lg"} %}</div>
                    <div class="js-swiper-{{ section_id }}-next swiper-button-next {{ section_arrows_class }} d-none d-md-block">{% include "snipplets/svg/chevron-right.tpl" with {svg_custom_class: "icon-inline icon-lg"} %}</div>
                {% endif %}
            {% else %}
                </div>
            {% endif %}
        </div>
    </div>
</div>
