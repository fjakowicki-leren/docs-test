window.tiendaNubeInstaTheme = (function(jQueryNuvem) {
	return {
		waitFor: function() {
			return [];
		},
		placeholders: function() {
			return [
				{
					placeholder: '.js-welcome-message-placeholder',
					content: '.js-welcome-message-top',
					contentReady: function() {
						// Show if there are any titles or description defined defined
						return 	$(this).find('.js-welcome-message-title').text().trim() || 
								$(this).find('.js-welcome-message-text').text().trim();
					},
				},
				{
					placeholder: '.js-institutional-message-placeholder',
					content: '.js-institutional-message-top',
					contentReady: function() {
						// Show if there are any titles or description defined defined
						return 	$(this).find('.js-institutional-message-title').text().trim() || 
								$(this).find('.js-institutional-message-text').text().trim();
					},
				},
				{
					placeholder: '.js-testimonials-placeholder',
					content: '.js-testimonials-top',
					contentReady: function() {
						// Show only if there are any titles or image defined
						return 	$(this).find('.js-testimonial-container').text().trim() ||
								$(this).find('.js-testimonial-img').map(function(){
									return $(this).attr("src");
								}).get().join('').trim();
						},
				},
				{
					placeholder: '.js-home-slider-placeholder',
					content: '.js-home-slider-top',
					contentReady: function() {
						return $(this).find('img').length > 0;
					},
				},
				{
					placeholder: '.js-category-banner-placeholder',
					content: '.js-category-banner-top',
					contentReady: function() {
						return $(this).find('img').length > 0;
					},
				},
				{
					placeholder: '.js-promotional-banner-placeholder',
					content: '.js-promotional-banner-top',
					contentReady: function() {
						return $(this).find('img').length > 0;
					},
				},
				{
					placeholder: '.js-news-banner-placeholder',
					content: '.js-news-banner-top',
					contentReady: function() {
						return $(this).find('img').length > 0;
					},
				},
			];
		},
		handlers: function(instaElements) {
			const handlers = {
				logo: new instaElements.Logo({
					$storeName: jQueryNuvem('#no-logo'),
					$logo: jQueryNuvem('#logo')
				}),
				// ----- Section order -----
				home_order_position: new instaElements.Sections({
					container: '.js-home-sections-container',
					data_store: {
						'slider': 'home-slider',
						'main_categories': 'home-categories-featured',
						'products': 'home-products-featured',
						'welcome': 'home-welcome-message',
						'institutional': 'home-institutional-message',
						'informatives': 'banner-services',
						'categories': 'home-banner-categories',
						'promotional': 'home-banner-promotional',
						'news_banners': 'home-banner-news',
						'featured_banners': 'home-banner-featured',
						'new': 'home-products-new',
						'video': 'home-video',
						'sale': 'home-products-sale',
						'promotion': 'home-products-promotion',
						'best_seller': 'home-products-best-seller',
						'instafeed': 'home-instagram-feed',
						'main_product': 'home-product-main',
						'brands': 'home-brands',
						'testimonials': 'home-testimonials',
						'newsletter' : 'home-newsletter',
					}
				}),
			};

			// ----------------------------------- Welcome Message -----------------------------------

			// Update section colors
			handlers.welcome_colors = new instaElements.Lambda(function(sectionColor){
				const $container = $('.js-section-welcome-message');

				if (sectionColor) {
					$container.addClass('section-welcome-home-colors');
				} else {
					$container.removeClass('section-welcome-home-colors');
				}
			});

			// Update text align
			handlers.welcome_align = new instaElements.Lambda(function(welcomeAlign){
				const $align_selector = $('.js-section-welcome-message-align');

				if (welcomeAlign == 'left') {
					$align_selector.removeClass('text-center');
				} else {
					$align_selector.addClass('text-center');
				}
			});

			// Update welcome message title
			handlers.welcome_message = new instaElements.Text({
				element: '.js-welcome-message-title',
				show: function(){
					$(this).show();
				},
				hide: function(){
					$(this).hide();
				},
			});

			// Update welcome message text
			handlers.welcome_text = new instaElements.Text({
				element: '.js-welcome-message-text',
				show: function(){
					$(this).show();
				},
				hide: function(){
					$(this).hide();
				},
			});

			// Update welcome message link
			handlers.welcome_link = new instaElements.Lambda(function(hasURL){
				const $link = $('.js-welcome-message-link');
				$link.attr('data-url', !!hasURL);

				if (hasURL && $link.text().trim()) {
					$link.show().addClass("d-inline-block");
				} else {
					$link.hide().removeClass("d-inline-block");
				}
			});

			// Update welcome message link text
			handlers.welcome_button = new instaElements.Text({
				element: '.js-welcome-message-link',
				show: function() {
					if ($(this).attr('data-url')) {
						$(this).show().addClass("d-inline-block");
					} else {
						$(this).hide().removeClass("d-inline-block");
					}
				},
				hide: function() {
					$(this).hide().removeClass("d-inline-block");
				}
			});

			// ----------------------------------- Institutional Message -----------------------------------

			// Update section colors
			handlers.institutional_colors = new instaElements.Lambda(function(sectionColor){
				const $container = $('.js-section-institutional-message');

				if (sectionColor) {
					$container.addClass('section-institutional-home-colors');
				} else {
					$container.removeClass('section-institutional-home-colors');
				}
			});

			// Update text align
			handlers.institutional_align = new instaElements.Lambda(function(institutionalAlign){
				const $align_selector = $('.js-section-institutional-message-align');

				if (institutionalAlign == 'left') {
					$align_selector.removeClass('text-center');
				} else {
					$align_selector.addClass('text-center');
				}
			});

			// Update message title
			handlers.institutional_message = new instaElements.Text({
				element: '.js-institutional-message-title',
				show: function(){
					$(this).show();
				},
				hide: function(){
					$(this).hide();
				},
			});

			// Update welcome message text
			handlers.institutional_text = new instaElements.Text({
				element: '.js-institutional-message-text',
				show: function(){
					$(this).show();
				},
				hide: function(){
					$(this).hide();
				},
			});

			// Update message link
			handlers.institutional_link = new instaElements.Lambda(function(hasURL){
				const $link = $('.js-institutional-message-link');
				$link.attr('data-url', !!hasURL);

				if (hasURL && $link.text().trim()) {
					$link.show().addClass("d-inline-block");
				} else {
					$link.hide().removeClass("d-inline-block");
				}
			});

			// Update message link text
			handlers.institutional_button = new instaElements.Text({
				element: '.js-institutional-message-link',
				show: function() {
					if ($(this).attr('data-url')) {
						$(this).show().addClass("d-inline-block");
					} else {
						$(this).hide().removeClass("d-inline-block");
					}
				},
				hide: function() {
					$(this).hide().removeClass("d-inline-block");
				}
			});

			// ----------------------------------- Slider -----------------------------------

			// Build the html for a slide given the data from the settings editor
			function buildHomeSlideDom(aSlide, alignClasses, imageClasses) {
				return '<div class="swiper-slide slide-container ' + aSlide.color + '">' +
							(aSlide.link ? '<a href="' + aSlide.link + '">' : '' ) +
								'<img src="' + aSlide.src + '" class="js-slider-image slider-image ' + imageClasses + '"/>' +
								'<div class="js-swiper-text swiper-text ' + alignClasses + ' swiper-text-' + aSlide.color + '">' +
									(aSlide.title ? '<div class="h1-huge mb-2">' + aSlide.title + '</div>' : '' ) +
									(aSlide.description ? '<p class="mb-2">' + aSlide.description + '</p>' : '' ) +
									(aSlide.button && aSlide.link ? '<div class="btn btn-default btn-small d-inline-block">' + aSlide.button + '</div>' : '' ) +
								'</div>' +
							(aSlide.link ? '</a>' : '' ) +
						'</div>'
			}

			// Update slider align
			handlers.slider_align = new instaElements.Lambda(function(sliderAlign){
				const $swiperText = $('.js-home-slider-container').find('.js-swiper-text');
				const $homeSlider = $('.js-home-slider, .js-home-slider-mobile');

				if (sliderAlign == 'left') {
					$homeSlider.attr('data-align', 'left')
					$swiperText.removeClass('swiper-text-centered');
				} else {
					$homeSlider.attr('data-align', 'center')
					$swiperText.addClass('swiper-text-centered');
				}
			});

			// Update slider animation
			handlers.slider_animation = new instaElements.Lambda(function(sliderAnimation){
				const $swiperText = $('.js-home-slider-container').find('.js-slider-image');
				const $homeSlider = $('.js-home-slider, .js-home-slider-mobile');

				if (sliderAnimation) {
					$homeSlider.attr('data-animation', 'true')
					$swiperText.addClass('slider-image-animation');
				} else {
					$homeSlider.attr('data-animation', 'false')
					$swiperText.removeClass('slider-image-animation');
				}
			});

			// Update main slider
			handlers.slider = new instaElements.Lambda(function(slides){
				if (!window.homeSwiper) {
					return;
				}

				// Update align classes
				const sliderAlign = $('.js-home-slider').attr('data-align');
				const alignClasses = sliderAlign == 'center' ? 'swiper-text-centered' : '';

				// Update animation classes
				const sliderAnimation = $('.js-home-slider').attr('data-animation');
				const imageClasses = sliderAnimation == 'true' ? 'slider-image-animation' : '';

				window.homeSwiper.removeAllSlides();
				slides.forEach(function(aSlide){
					window.homeSwiper.appendSlide(buildHomeSlideDom(aSlide, alignClasses, imageClasses));
				});
			});

			// Update mobile slider
			handlers.slider_mobile = new instaElements.Lambda(function(slides){
				// This slider is not included in the html if `toggle_slider_mobile` is not set.
				// The second condition could be removed if live preview for this checkbox is implemented but changing the viewport size forces a refresh, so it's not really necessary.
				if (!window.homeMobileSwiper || !window.homeMobileSwiper.slides) {
					return;
				}

				// Update align classes
				const sliderAlign = $('.js-home-slider-mobile').attr('data-align');
				const alignClasses = sliderAlign == 'center' ? 'swiper-text-centered' : '';

				// Update animation classes
				const sliderAnimation = $('.js-home-slider-mobile').attr('data-animation');
				const imageClasses = sliderAnimation == 'true' ? 'slider-image-animation' : '';

				window.homeMobileSwiper.removeAllSlides();
				slides.forEach(function(aSlide){
					window.homeMobileSwiper.appendSlide(buildHomeSlideDom(aSlide, alignClasses, imageClasses));
				});
			});

			// Update slider full
			handlers.slider_full = new instaElements.Lambda(function(sliderFull){
				const $container = $('.js-home-slider-container');
				const $row = $('.js-home-slider-row');
				const $swiperContainer = $('.js-home-main-slider, .js-home-mobile-slider');
				const $swiperArrows = $('.js-swiper-home-control');

				if (sliderFull) {
					$container.removeClass('container').addClass('container-fluid p-0');
					$row.addClass('no-gutters');
					$swiperContainer.addClass('swiper-arrows-light');
					$swiperArrows.removeClass('swiper-button-outside');

					// Updates slider width to avoids swipes inconsistency
					window.homeSwiper.params.observer = true;
					window.homeSwiper.update();

				} else {
					$container.removeClass('container-fluid p-0').addClass('container');
					$row.removeClass('no-gutters');
					$swiperContainer.removeClass('swiper-arrows-light');
					$swiperArrows.addClass('swiper-button-outside');

					// Updates slider width to avoids swipes inconsistency
					window.homeSwiper.params.observer = true;
					window.homeSwiper.update();
				}
			});

			// ----------------------------------- Testimonials -----------------------------------

			// Update testimonials section title
			handlers.testimonials_title = new instaElements.Text({
				element: '.js-testimonial-title',
				show: function(){
					$(this).show();
				},
				hide: function(){
					$(this).hide();
				},
			});

			// Updates testimonials section title: Using Lambda instead of Text to target multiple titles (placeholder and final feature)
			handlers.testimonials_title = new instaElements.Lambda(function(testimonialsTitle){
				const $testimonialsTitle = $('.js-testimonial-title');
				const $testimonialsTitleContainer = $('.js-testimonial-title').parent();

				$testimonialsTitle.text(testimonialsTitle);

				if(testimonialsTitle){
					$testimonialsTitleContainer.show();
				}else{
					$testimonialsTitleContainer.hide();
				}
			});

			// Set col-* classes depending on the number of visible testimonials
			function setTestimonialsContainerGridClasses(selector) {
				const $testimonialsSection = $(selector);
				const $testimonialsTitle = $testimonialsSection.find(".js-testimonial-title-container");
				const $testimonialsContainer = $testimonialsSection.find(".js-testimonial-container");
				const $testimonial = $testimonialsSection.find(".js-testimonial-slide");
				const $lastTestimonial = $testimonialsSection.find(".js-last-testimonial-slide");

				const qty = $testimonial.filter(':visible').length;

				$testimonialsTitle.removeClass('col-12 col-md-2');
				$testimonialsContainer.removeClass('col-12 col-md-10');
				$testimonial.removeClass('col-md-6 m-0 col-md mr-md-0');

				if (qty == 3) {
					$testimonialsTitle.addClass('col-12');
					$testimonialsContainer.addClass('col-12');
				} else if (qty == 1) {
					$testimonialsTitle.addClass('col-md-2');
					$testimonialsContainer.removeClass("p-0 px-md-3").addClass('col-md-10');
				} else {
					$testimonialsTitle.addClass('col-md-2');
					$testimonialsContainer.addClass('col-md-10');
				}

				if ((qty == 3) || (qty == 2)) {
					$testimonial.removeClass('col-md-6 m-md-0').addClass('col-md');
					window.testimonialsSwiper.params.slidesPerView = 1.8;
					window.testimonialsSwiper.params.loop = true;
				} else {
					$testimonial.addClass('col-md-6 m-md-0');
					window.testimonialsSwiper.params.slidesPerView = 'auto';
				}

				$lastTestimonial.addClass("mr-md-0");

				window.testimonialsSwiper.params.observer = true;
				window.testimonialsSwiper.update();
			}

			// Updates visibility of each testimonial

			function testimonialContentVisibility(container){
				const hasContent = $(container).find('.js-testimonial-description').text().trim() || 
						$(container).find('.js-testimonial-name').text().trim() ||
						$(container).find('.js-testimonial-img').attr('src');
				if(hasContent){
					$(container).show();
				}else{
					$(container).hide();
				}

				setTestimonialsContainerGridClasses('.js-section-testimonials');
			}

			// Updates visibility of each testimonial's content

			for (let i = 1; i <= 4; i++) {
				// Update image for each testimonials banner
				handlers[`testimonial_0${i}.jpg`] = new instaElements.Image({
					element: `.js-testimonial-img-${i}`,
					show: function() {
						$(this).parent(".js-testimonial-img-container").show();

						// Maybe show container now that there's content inside
						testimonialContentVisibility($(this).closest('.js-section-testimonials, .js-testimonial-slide'));
					},
					hide: function() {
						$(this).parent().hide();

						// Maybe hide if there's no content inside
						testimonialContentVisibility($(this).closest('.js-section-testimonials, .js-testimonial-slide'));
					},
				});

				// Update title and description for each informative banner
				['name', 'description'].forEach(setting => {
					handlers[`testimonial_0${i}_${setting}`] = new instaElements.Text({
						element: `.js-testimonial-${setting}-${i}`,
						show: function(){
							$(`.js-testimonial-${setting}-${i}`).show();
							$(`.js-testimonial-${setting}-${i}`).closest('.js-testimonial-slide').show();
							testimonialContentVisibility($(this).closest('.js-testimonial-slide'));
						},
						hide: function(){
							$(`.js-testimonial-${setting}-${i}`).hide();
							$(`.js-testimonial-${setting}-${i}`).closest('.js-testimonial-slide').hide();
							testimonialContentVisibility($(this).closest('.js-testimonial-slide'));
						},
					});
				});
			}

			// ----------------------------------- Main Banners -----------------------------------

			// Build the html for a slide given the data from the settings editor
			function buildHomeBannerDom(aSlide, bannerClasses, textBannerClasses, columnClasses, textClasses, imageContainerClasses, imageClasses) {
				return '<div class="js-banner ' + bannerClasses + ' ' + columnClasses + '">' +
						'<div class="js-textbanner textbanner ' + textBannerClasses + '">' +
							(aSlide.link ? '<a href="' + aSlide.link + '">' : '' ) +
								'<div class="js-textbanner-image-container textbanner-image overflow-none ' + imageContainerClasses + '">' +
									'<img src="' + aSlide.src + '" class="js-textbanner-image textbanner-image-effect ' + imageClasses + '">' +
								'</div>' +
								(aSlide.title || aSlide.description || aSlide.button ? '<div class="js-textbanner-text textbanner-text ' + textClasses + '">' : '') +
									(aSlide.title ? '<div class="h2 my-2">' + aSlide.title + '</div>' : '' ) +
									(aSlide.description ? '<div class="textbanner-paragraph font-small font-md-body">' + aSlide.description + '</div>' : '' ) +
									(aSlide.button && aSlide.link ? '<div class="btn btn-default btn-smallest mt-1 mt-md-2">' + aSlide.button + '</div>' : '' ) +
								(aSlide.title || aSlide.description || aSlide.button ? '</div>' : '') +
							(aSlide.link ? '</a>' : '' ) +
						'</div>' +
					'</div>'
			}

			['banner', 'banner_promotional', 'banner_news'].forEach(setting => {

				const bannerName = setting.replace('_', '-');
				const bannerPluralName = 
					setting == 'banner' ? 'banners' : 
					setting == 'banner_promotional' ? 'banners-promotional' : 
					setting == 'banner_news' ? 'banners-news' :
					null;
				const $bannerMainContainer = $(`.js-home-${bannerName}`);
				const $bannerMainItem = $bannerMainContainer.find('.js-banner');
				const bannerSwiper = 
					setting == 'banner' ? 'homeBannerSwiper' : 
					setting == 'banner_promotional' ? 'homeBannerPromotionalSwiper' : 
					setting == 'banner_news' ? 'homeBannerNewsSwiper' :
					null;
				const bannerFormat = $bannerMainContainer.attr('data-format');

				const desktopColumns = $bannerMainContainer.attr('data-desktop-columns');
				const mobileColumns = $bannerMainContainer.attr('data-mobile-columns');

				// Update section title
				handlers[`${setting}_title`] = new instaElements.Text({
					element: `.js-${bannerPluralName}-title`,
					show: function(){
						$(this).show();
					},
					hide: function(){
						$(this).hide();
					},
				})

				// Update banners content
				handlers[`${setting}`] = new instaElements.Lambda(function(slides){

					// Update text classes
					const textPosition = $bannerMainContainer.attr('data-text');
					const textClasses = textPosition == 'above' ? 'over-image' : '';
					const backgroundClasses = textPosition == 'outside' ? 'background-secondary' : '';

					// Update margin classes
					const bannerMargin = $bannerMainContainer.attr('data-margin');
					const marginClasses = bannerMargin == 'false' ? 'textbanner-unstyled m-0' : '';

					// Update textbanner classes
					const textBannerClasses = marginClasses + ' ' + backgroundClasses;

					// Update image classes
					const imageSize = $bannerMainContainer.attr('data-image');
					const imageClasses = imageSize == 'same' ? 'textbanner-image-background' : 'img-fluid d-block w-100';
					const imageContainerClasses = imageSize == 'original' ? 'p-0' : '';

					if (bannerFormat == 'slider') {
						// Update banner classes
						const bannerClasses = 'swiper-slide';
						// Avoids columnsClasses on slider
						const columnClasses = '';

						if (!window[bannerSwiper]) {
							return;
						}

						window[bannerSwiper].removeAllSlides();
						slides.forEach(function(aSlide){
							window[bannerSwiper].appendSlide(buildHomeBannerDom(aSlide, bannerClasses, textBannerClasses, columnClasses, textClasses, imageContainerClasses, imageClasses));
						});
						window[bannerSwiper].update();
					} else {
						// Update banner classes
						const bannerClasses = 'col-grid';
						// Update column classes
						const desktopColumnsClasses = $bannerMainContainer.attr('data-grid-classes');
						const mobileColumns = $bannerMainContainer.attr('data-mobile-columns');
						const mobileColumnsClasses = mobileColumns == '2' ? 'col-6' : '';
						const columnClasses = desktopColumnsClasses + ' ' + mobileColumnsClasses;

						$bannerMainContainer.find('.js-banner').remove();
						slides.forEach(function(aSlide){
							$bannerMainContainer.find('.js-banner-row').append(buildHomeBannerDom(aSlide, bannerClasses, textBannerClasses, columnClasses, textClasses, imageContainerClasses, imageClasses));
						});
					}
				});

				// Update banner text position
				handlers[`${setting}_text_outside`] = new instaElements.Lambda(function(hasOutsideText){
					const $bannerItem = $bannerMainContainer.find('.js-textbanner');
					const $bannerText = $bannerMainContainer.find('.js-textbanner-text');
					const $bannerLight = $bannerItem.hasClass('text-light');

					if (hasOutsideText) {
						$bannerMainContainer.attr('data-text', 'outside');
						$bannerText.removeClass('over-image').addClass('background-secondary');
						if ($bannerLight) {
							$bannerText.removeClass('text-light');
						}
					} else {
						$bannerMainContainer.attr('data-text', 'above');
						$bannerText.removeClass('background-secondary').addClass('over-image');
						if ($bannerLight) {
							$bannerText.addClass('text-light');
						}
					}
				});

				// Update banner size
				handlers[`${setting}_same_size`] = new instaElements.Lambda(function(bannerSize){
					const $bannerImageContainer = $bannerMainContainer.find('.js-textbanner-image-container');
					const $bannerImage = $bannerMainContainer.find('.js-textbanner-image');

					if (bannerSize) {
						$bannerMainContainer.attr('data-image', 'same');
						$bannerImageContainer.removeClass('p-0');
						$bannerImage.removeClass('img-fluid d-block w-100').addClass('textbanner-image-background');
					} else {
						$bannerMainContainer.attr('data-image', 'original');
						$bannerImageContainer.addClass('p-0');
						$bannerImage.removeClass('textbanner-image-background').addClass('img-fluid d-block w-100');
					}
				});

				// Update banner margins
				handlers[`${setting}_without_margins`] = new instaElements.Lambda(function(bannerMargin){
					const bannerFormat = $bannerMainContainer.attr('data-format');
					const $bannerContainer = $bannerMainContainer.find('.js-banner-container');
					const $bannerRow = $bannerContainer.find('.js-banner-row:not(.swiper-wrapper)');
					const $bannerCol = $bannerContainer.find('.js-banner-col');
					const $bannerMainTitle = $(`.js-${bannerPluralName}-title`);
					const $bannerItemContainer = $bannerMainContainer.find('.js-banner');
					const $bannerItem = $bannerItemContainer.find('.js-textbanner');
					const $bannerItemSlide = $bannerMainContainer.find('.js-banner.swiper-slide');
					const $bannerSwiper = $(`.js-swiper-${bannerPluralName}`);
					const $bannerArrows = $(`.js-swiper-${bannerPluralName}-prev, .js-swiper-${bannerPluralName}-next`);

					if (bannerMargin) {
						$bannerMainContainer.attr('data-margin', 'false');
						$bannerContainer.removeClass('container').addClass('container-fluid p-0 overflow-none');
						$bannerSwiper.removeClass('pb-1 pl-1');
						$bannerRow.removeClass('px-2').addClass('no-gutters');
						$bannerMainTitle.addClass('container');
						$bannerItemContainer.addClass('m-0');
						$bannerItem.addClass('m-0 textbanner-unstyled');
						$bannerItemSlide.addClass('p-0');
						$bannerArrows.removeClass('swiper-button-outside svg-icon-text').addClass('mx-2 svg-icon-invert');
						if (bannerFormat == 'slider') {
							$bannerCol.removeClass('pr-0 pr-md-3');
							window[bannerSwiper].params.spaceBetween = 0;
						}
					} else {
						$bannerMainContainer.attr('data-margin', 'true');
						$bannerContainer.removeClass('container-fluid p-0 overflow-none').addClass('container');
						$bannerSwiper.addClass('pb-1 pl-1');
						$bannerRow.removeClass('no-gutters').addClass('px-2');
						$bannerMainTitle.removeClass('container');
						$bannerItemContainer.removeClass('m-0');
						$bannerItem.removeClass('m-0 textbanner-unstyled');
						$bannerItemSlide.removeClass('p-0');
						$bannerArrows.removeClass('mx-2 svg-icon-invert').addClass('swiper-button-outside svg-icon-text');
						if (bannerFormat == 'slider') {
							$bannerCol.addClass('pr-0 pr-md-3');
							window[bannerSwiper].params.spaceBetween = 15;
						}
					}

					// Updates slider width to avoids swipes inconsistency
					if (bannerFormat == 'slider') {
						window[bannerSwiper].params.observer = true;
						window[bannerSwiper].update();
					}
				});

				// Update banner format
				handlers[`${setting}_slider`] = new instaElements.Lambda(function(bannerSlider){
					if (bannerSlider) {
						$bannerMainContainer.attr('data-format', 'slider');
					} else {
						$bannerMainContainer.attr('data-format', 'grid');
					}
				});

				// Update quantity desktop banners
				handlers[`${setting}_columns_desktop`] = new instaElements.Lambda(function(bannerQuantity){
					const $bannerItem = $bannerMainContainer.find('.js-banner');
					const bannerFormat = $bannerMainContainer.attr('data-format');

					$bannerItem.removeClass('col-md-3 col-md-4 col-md-6 col-md-12');
					if (bannerQuantity == 4) {
						$bannerMainContainer.attr('data-desktop-columns', bannerQuantity);
						$bannerMainContainer.attr('data-grid-classes', 'col-md-3');

						if (bannerFormat == 'grid') {
							$bannerItem.addClass('col-md-3');
						} else {
							if (window.innerWidth > 768) {
								window[bannerSwiper].params.slidesPerView = 4;
								window[bannerSwiper].update();
							}
						}
					} else if (bannerQuantity == 3) {
						$bannerMainContainer.attr('data-desktop-columns', bannerQuantity);
						$bannerMainContainer.attr('data-grid-classes', 'col-md-4');

						if (bannerFormat == 'grid') {
							$bannerItem.addClass('col-md-4');
						} else {
							if (window.innerWidth > 768) {
								window[bannerSwiper].params.slidesPerView = 3;
								window[bannerSwiper].update();
							}
						}
					} else if (bannerQuantity == 2) {
						$bannerMainContainer.attr('data-desktop-columns', bannerQuantity);
						$bannerMainContainer.attr('data-grid-classes', 'col-md-6');

						if (bannerFormat == 'grid') {
							$bannerItem.addClass('col-md-6');
						} else {
							if (window.innerWidth > 768) {
								window[bannerSwiper].params.slidesPerView = 2;
								window[bannerSwiper].update();
							}
						}
					} else if (bannerQuantity == 1) {
						$bannerMainContainer.attr('data-desktop-columns', bannerQuantity);
						$bannerMainContainer.attr('data-grid-classes', 'col-md-12');

						if (bannerFormat == 'grid') {
							$bannerItem.addClass('col-md-12');
						} else {
							if (window.innerWidth > 768) {
								window[bannerSwiper].params.slidesPerView = 1;
								window[bannerSwiper].update();
							}
						}
					}
				});

				// Update quantity mobile banners
				handlers[`${setting}_columns_mobile`] = new instaElements.Lambda(function(bannerQuantity){
					const $bannerItem = $bannerMainContainer.find('.js-banner');
					const bannerFormat = $bannerMainContainer.attr('data-format');

					$bannerItem.removeClass('col-6');
					if (bannerQuantity == 2) {
						$bannerMainContainer.attr('data-mobile-columns', bannerQuantity);
						if (bannerFormat == 'grid') {
							$bannerItem.addClass('col-6');
						} else {
							if (window.innerWidth < 768) {
								window[bannerSwiper].params.slidesPerView = 2.25;
								window[bannerSwiper].update();
							}
						}
					} else if (bannerQuantity == 1) {
						$bannerMainContainer.attr('data-mobile-columns', bannerQuantity);
						if (bannerFormat == 'slider') {
							if (window.innerWidth < 768) {
								window[bannerSwiper].params.slidesPerView = 1.15;
								window[bannerSwiper].update();
							}
						}
					}
				});

				// Toggle grid and slider view
				handlers[`${setting}_slider`] = new instaElements.Lambda(function(bannerSlider){

					const $bannerCol = $bannerMainContainer.find('.js-banner-col');
					const $bannerRow = $bannerMainContainer.find('.js-banner-row');

					const bannerMargin = $bannerMainContainer.attr('data-margin');

					if (bannerSlider) {
						$bannerMainContainer.attr('data-format', 'slider');
						$bannerRow.removeClass('px-2');
						if (bannerMargin == 'true') {
							$bannerCol.addClass('pr-0 pr-md-3');
						}
					} else {
						$bannerMainContainer.attr('data-format', 'grid');
						$bannerCol.removeClass('pr-0 pr-md-3');
					}

					const bannerFormat = $bannerMainContainer.attr('data-format');

					const toSlider = bannerFormat == "slider";

					const $bannerItem = $bannerMainContainer.find('.js-banner');

					if ($bannerMainContainer.data('format') == bannerFormat) {
						// Nothing to do
						return;
					}

					// From grid to slider
					if (toSlider) {

						const swiperDesktopColumns = $bannerMainContainer.attr('data-desktop-columns');
						const swiperMobileColumns = ($bannerMainContainer.attr('data-mobile-columns') == 2) ? 2.25 : 1.15;

						const bannerArrowsClasses = bannerMargin == 'true' ? 'swiper-button-outside svg-icon-text' : 'mx-2 svg-icon-invert';

						const bannerSpaceBetween = bannerMargin == 'false' ? 0 : 15;

						$bannerItem.removeClass('col-grid col-6 col-md-3 col-md-4 col-md-6 col-md-12');

						// Row to swiper wrapper
						$bannerRow.removeClass('row').addClass('swiper-wrapper');

						// Wrap everything inside a swiper container
						$bannerRow.wrapAll(`<div class="js-swiper-${bannerPluralName} swiper-container"></div>`);

						// Replace each banner into a slide
						$bannerItem.addClass('swiper-slide p-0');

						// Add previous and next controls
						$bannerCol.append(`
							<div class="js-swiper-${bannerPluralName}-prev swiper-button-prev ${bannerArrowsClasses} d-none d-md-block">
								<svg class="icon-inline icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M248.5,33.1a25.59,25.59,0,0,0-36.2,0L7.5,237.9a25.59,25.59,0,0,0,0,36.2L212.3,478.9a25.6,25.6,0,0,0,36.2-36.2L61.8,256,248.5,69.3A25.59,25.59,0,0,0,248.5,33.1Z"/></svg>
							</div>
							<div class="js-swiper-${bannerPluralName}-next swiper-button-next ${bannerArrowsClasses} d-none d-md-block">
								<svg class="icon-inline icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M7.5,69.3,194.2,256,7.5,442.7a25.6,25.6,0,0,0,36.2,36.2L248.5,274.1a25.59,25.59,0,0,0,0-36.2L43.7,33.1A25.6,25.6,0,0,0,7.5,69.3Z"/></svg>
							</div>
						`);

						// Initialize swiper
						createSwiper(`.js-swiper-${bannerPluralName}`, {
							watchOverflow: true,
							threshold: 5,
							watchSlideProgress: true,
							watchSlidesVisibility: true,
							slideVisibleClass: 'js-swiper-slide-visible',
							spaceBetween: bannerSpaceBetween,
							navigation: {
								nextEl: `.js-swiper-${bannerPluralName}-next`,
								prevEl: `.js-swiper-${bannerPluralName}-prev`
							},
							slidesPerView: swiperMobileColumns,
							breakpoints: {
								768: {
									slidesPerView: swiperDesktopColumns,
								}
							}
						},
						function(swiperInstance) {
							window[bannerSwiper] = swiperInstance;
						});

						// Update banners build
						handlers[`${setting}`] = new instaElements.Lambda(function(slides){
							// Update margin classes
							const bannerMargin = $bannerMainContainer.attr('data-margin');
							const marginClasses = bannerMargin == 'false' ? 'textbanner-unstyled m-0' : '';

							// Update banner classes
							const bannerClasses = 'swiper-slide slide-container';
							// Avoids columnsClasses on slider
							const columnClasses = '';

							// Update text classes
							const textPosition = $bannerMainContainer.attr('data-text');
							const textClasses = textPosition == 'above' ? 'over-image' : '';
							const backgroundClasses = textPosition == 'outside' ? 'background-secondary' : '';

							// Update textbanner classes
							const textBannerClasses = marginClasses + ' ' + backgroundClasses;

							// Update image classes
							const imageSize = $bannerMainContainer.attr('data-image');
							const imageClasses = imageSize == 'same' ? 'textbanner-image-background' : 'img-fluid d-block w-100';
							const imageContainerClasses = imageSize == 'original' ? 'p-0' : '';

							window[bannerSwiper].removeAllSlides();
							slides.forEach(function(aSlide){
								window[bannerSwiper].appendSlide(buildHomeBannerDom(aSlide, bannerClasses, textBannerClasses, columnClasses, textClasses, imageContainerClasses, imageClasses));
							});
						});

					// From slider to grid
					} else {
						const desktopColumnsClasses = $bannerMainContainer.attr('data-grid-classes');
						const mobileColumns = $bannerMainContainer.attr('data-mobile-columns');
						const mobileColumnsClasses = mobileColumns == '2' ? 'col-6' : '';
						const columnClasses = desktopColumnsClasses + ' ' + mobileColumnsClasses;
						const bannerClasses = 'col-grid ' + columnClasses;

						const bannerMargin = $bannerMainContainer.attr('data-margin');
						const marginClasses = bannerMargin == 'false' ? 'no-gutters' : 'px-2';

						// Remove duplicate slides and slider controls
						$bannerMainContainer.find('.swiper-slide-duplicate').remove()
						$bannerMainContainer.find(`.js-swiper-${bannerPluralName}-prev`).remove()
						$bannerMainContainer.find(`.js-swiper-${bannerPluralName}-next`).remove()

						// Swiper wrapper to row
						$bannerRow.removeClass('swiper-wrapper').addClass('row ' + marginClasses).removeAttr('style');

						// Undo all slider wrappers and restore original classes
						$bannerRow.unwrap();
						$bannerItem
							.removeClass('js-swiper-slide-visible swiper-slide-active swiper-slide-next swiper-slide-prev swiper-slide p-0')
							.addClass(bannerClasses)
							.removeAttr('style');

						// Update banners build
						handlers[`${setting}`] = new instaElements.Lambda(function(slides){
							// Update banner classes
							const bannerClasses = 'col-grid';
							// Update column classes
							const desktopColumnsClasses = $bannerMainContainer.attr('data-grid-classes');
							const mobileColumns = $bannerMainContainer.attr('data-mobile-columns');
							const mobileColumnsClasses = mobileColumns == '2' ? 'col-6' : '';
							const columnClasses = desktopColumnsClasses + ' ' + mobileColumnsClasses;

							// Update text classes
							const textPosition = $bannerMainContainer.attr('data-text');
							const textClasses = textPosition == 'above' ? 'over-image' : '';
							const backgroundClasses = textPosition == 'outside' ? 'background-secondary' : '';

							// Update margin classes
							const bannerMargin = $bannerMainContainer.attr('data-margin');
							const marginClasses = bannerMargin == 'false' ? 'textbanner-unstyled m-0' : '';

							// Update textbanner classes
							const textBannerClasses = marginClasses + ' ' + backgroundClasses;

							// Update image classes
							const imageSize = $bannerMainContainer.attr('data-image');
							const imageClasses = imageSize == 'same' ? 'textbanner-image-background' : 'img-fluid d-block w-100';
							const imageContainerClasses = imageSize == 'original' ? 'p-0' : '';

							$bannerMainContainer.find('.js-banner').remove();
							slides.forEach(function(aSlide){
								$bannerMainContainer.find('.js-banner-row').append(buildHomeBannerDom(aSlide, bannerClasses, textBannerClasses, columnClasses, textClasses, imageContainerClasses, imageClasses));
							});
						});
					}

					// Persist new format in data attribute
					$bannerMainContainer.data('format', bannerFormat);
				});
			});

			// ----------------------------------- Highlighted Products -----------------------------------

			// Same logic applies to all 5 types of highlighted products

			['featured', 'new', 'sale', 'promotion', 'best_seller'].forEach(setting => {
				
				let settingSelector = setting;
				if (setting === 'best_seller') {
					settingSelector = 'best-seller';
				}
				const $section = $(`.js-section-products-${settingSelector}`);
				const $productContainer = $(`.js-products-${settingSelector}-container`);
				const $swiperContainer = $(`.js-swiper-${settingSelector}`);
				const $productGrid = $(`.js-products-${settingSelector}-grid`);
				const $titleColumn = $(`.js-products-${settingSelector}-horizontal-title-col`);
				const $contentColumn = $(`.js-products-${settingSelector}-horizontal-content-col`);
				const $title = $(`.js-products-${settingSelector}-title`);

				const productSwiper = 
					setting == 'featured' ? 'productsFeaturedSwiper' : 
					setting == 'new' ? 'productsNewSwiper' : 
					setting == 'sale' ? 'productsSaleSwiper' :
					setting == 'promotion' ? 'productsPromotionSwiper' :
					setting == 'best_seller' ? 'productsBestSellerSwiper' :
					null;

				let $productItem = $productGrid.find(`.js-item-product`);
				const $productItemQuickshopIcon = $productItem.find(".js-open-quickshop-icon, .js-quickshop-bag");
	
				// Updates title text
				handlers[`${setting}_products_title`] = new instaElements.Text({
					element: `.js-products-${settingSelector}-title`,
					show: function(){
						$(this).show();
					},
					hide: function(){
						$(this).hide();
					},
				})

				// Updates quantity products desktop
				handlers[`${setting}_products_desktop`] = new instaElements.Lambda(function(desktopProductQuantity){
					if (window.innerWidth > 768) {
						const productFormat = $productGrid.attr('data-format');
						const horizontalItem = $productGrid.attr('data-horizontal-item');
						$productItem.removeClass('col-md-2 col-md-2-4 col-md-3');
						$productGrid.attr('data-desktop-columns', desktopProductQuantity);
						if(horizontalItem == 'false'){
							if (productFormat == 'grid') {
								if (desktopProductQuantity == 6) {
									$productItem.addClass('col-md-2');
								} else if (desktopProductQuantity == 5) {
									$productItem.addClass('col-md-2-4');
								} else if (desktopProductQuantity == 4) {
									$productItem.addClass('col-md-3');
								}
							}else{
								window[productSwiper].params.slidesPerView = desktopProductQuantity;
								window[productSwiper].update();
							}
						}
					}
				});

				// Updates quantity products mobile
				handlers[`${setting}_products_mobile`] = new instaElements.Lambda(function(mobileProductQuantity){
					if (window.innerWidth < 768) {
						$productItem.removeClass('col-6 col-12');
						const productFormat = $productGrid.attr('data-format');
						const horizontalItem = $productGrid.attr('data-horizontal-item');
						const mobileProductSliderQuantity = mobileProductQuantity == '2' ? '2.25' : '1.15';
						$productGrid.attr('data-mobile-columns', mobileProductQuantity);

						if(horizontalItem == 'false'){
							if (productFormat == 'grid') {
								if (mobileProductQuantity == 1) {
									$productItem.addClass('col-12');
									$productItemQuickshopIcon.removeClass("item-quickshop-icon-md");

								} else if (mobileProductQuantity == 2) {
									$productItem.addClass('col-6');
									$productItemQuickshopIcon.addClass("item-quickshop-icon-md");
								}
							}else{
								window[productSwiper].params.slidesPerView = mobileProductSliderQuantity;
								window[productSwiper].update();
							}
						}
					}
				});

				// Updates item horizontal format
				handlers[`${setting}_products_horizontal_item`] = new instaElements.Lambda(function(horizontalItem){
					const productFormat = $productGrid.attr('data-format');
					const desktopProductQuantity = $productGrid.attr('data-desktop-columns');
					const mobileProductQuantity = $productGrid.attr('data-mobile-columns');
					const itemShowsStock = $productContainer.attr('data-item-stock');
					const itemQuickshop = $productContainer.attr('data-item-quickshop');
					const itemColorVariants = $productContainer.attr('data-item-color-variants');
					const itemQuickshopOrColorVariants = itemQuickshop == 'true' || itemColorVariants == 'true';

					$productItem = $productGrid.find(`.js-item-product`);

					const $productItemContainer = $productItem.find(".js-item-container");
					const $productItemImageContainer = $productItem.find(".js-image-container");
					const $productItemDescription = $productItem.find(".js-item-description");
					const $productItemName = $productItem.find(".js-item-name");
					const $productItemPrice = $productItem.find(".js-price-display");
					const $productItemColorsContainer = $productItem.find(".js-item-colors-container");
					const $productItemQuickshopOrColorsContainer = $productItem.find(".js-item-quickshop-or-colors-container");
					const $productItemQuickshopContainer = $productItem.find(".js-item-quickshop-container");
					const $productItemStockContainer = $productItem.find(".js-item-stock-container");
					
					if (horizontalItem) {
						$productGrid.attr("data-horizontal-item" , "true");

						//Item updates
						$productItemContainer.addClass("item-horizontal");
						$productItemImageContainer.addClass("col-auto pr-0");
						$productItemDescription.addClass("col");
						$productItemName.removeClass("mt-1 mb-3").addClass("mb-2");
						$productItemPrice.removeClass("h5").addClass("h6");
						if(itemShowsStock == 'true'){
							$productItemQuickshopContainer.removeClass("col").addClass("col-auto pr-0");
						}else{
							$productItemQuickshopContainer.addClass("col-8");
						}
						$productItemStockContainer.removeClass("pl-0 pl-md-1").addClass("pl-2");
						if(itemQuickshopOrColorVariants == 'false'){
							$productItemContainer.wrapAll(`<div class="js-item-horizontal-container row no-gutters"></div>`)
						}else{
							$productItemQuickshopOrColorsContainer.addClass("row no-gutters");
						}
						$productItemColorsContainer.hide();

						//Grid updates

						let $horizontalContentGrid = $contentColumn;

						//Generate new markup in case it does not exists
						if(!$contentColumn.length){
							$horizontalContentGrid = $(`<div class="js-products-${settingSelector}-horizontal-content-col col-md-10"></div>`);
						}
						
						if(productFormat == 'grid'){
							//Update grid position
							$productGrid.detach().appendTo($horizontalContentGrid);

							//Update item grid classes
							$productItem.addClass("col-12 col-md-4").removeClass("col-6 col-md-2-4 col-md-3 col-md-5");
							
						}else{
							//Wait until DOM stopped changing to init swiper
							if($(`.js-swiper-${settingSelector}`).length){
								setTimeout(function(){
									$(`.js-swiper-${settingSelector}`).detach().appendTo($horizontalContentGrid);
									$(`.js-swiper-${settingSelector}-prev`).detach().appendTo($horizontalContentGrid);
									$(`.js-swiper-${settingSelector}-next`).detach().appendTo($horizontalContentGrid);
									if (window.innerWidth < 768) {
										window[productSwiper].params.slidesPerView = '1.15';
									}else{
										window[productSwiper].params.slidesPerView = '3';
									}
									window[productSwiper].update();
								},100);
							}
						}

						//Update layout
						$title.addClass("mt-md-3");
						$titleColumn.removeClass("col-md-12").addClass("col-md-2");
						$titleColumn.after($horizontalContentGrid);
						setTimeout(function(){
							$(`.js-products-${settingSelector}-horizontal-content-col:empty`).remove();
						},500);
						if(productFormat == 'slider'){
							$horizontalContentGrid.addClass("pr-0 pr-md-3");
						}
						
					} else {
						$productGrid.attr("data-horizontal-item" , "false");

						//Item updates
						$productItemContainer.removeClass("item-horizontal");
						$productItemImageContainer.removeClass("col-auto pr-0");
						$productItemDescription.removeClass("col");
						$productItemName.addClass("mt-1 mb-3").removeClass("mb-2");
						$productItemPrice.removeClass("h6").addClass("h5");
						if(itemShowsStock == 'true'){
							$productItemQuickshopContainer.addClass("col").removeClass("col-auto pr-0");
						}else{
							$productItemQuickshopContainer.removeClass("col-8");
						}
						$productItemStockContainer.addClass("pr-md-3");
						if(itemQuickshop == 'true'){
							if(mobileProductQuantity == '2'){
								$productItemStockContainer.removeClass("pl-2").addClass("pl-0 pl-md-1");
							}else{
								$productItemStockContainer.removeClass("pl-0 pl-md-1").addClass("pl-2");
							}
						}
						if(itemColorVariants == 'true'){
							$productItemColorsContainer.show();
						}

						//Grid updates
						if(itemQuickshopOrColorVariants == 'false'){
							$productItemContainer.unwrap()
						}else{
							$productItemQuickshopOrColorsContainer.removeClass("row no-gutters");
						}

						if(productFormat == 'grid'){
							//Update grid position
							$productGrid.detach().appendTo($titleColumn);

							//Update item grid classes
							$productItem.removeClass("col-12 col-6 col-md-2-4 col-md-3 col-md-5 col-md-4");
							if (desktopProductQuantity == 6) {
								$productItem.addClass('col-md-2');
							} else if (desktopProductQuantity == 5) {
								$productItem.addClass('col-md-2-4');
							} else if (desktopProductQuantity == 4) {
								$productItem.addClass('col-md-3');
							}
							if (mobileProductQuantity == 1) {
								$productItem.addClass('col-12');

							} else if (mobileProductQuantity == 2) {
								$productItem.addClass('col-6');
							}
							$contentColumn.remove();
						}else{
							//Reset and create new swiper to avoid layout problems
							const mobileProductSliderQuantity = mobileProductQuantity == '2' ? '2.25' : '1.15';
							if($(`.js-swiper-${settingSelector}`).length){
								setTimeout(function(){
									$(`.js-swiper-${settingSelector}`).detach().appendTo($titleColumn);
									$(`.js-swiper-${settingSelector}-prev`).detach().appendTo($titleColumn);
									$(`.js-swiper-${settingSelector}-next`).detach().appendTo($titleColumn);
									if (window.innerWidth < 768) {
										window[productSwiper].params.slidesPerView = mobileProductSliderQuantity;
									}else{
										window[productSwiper].params.slidesPerView = desktopProductQuantity;
									}
									window[productSwiper].update();
									$titleColumn.addClass("pr-0 pr-md-3");
								},100);
							}
						}

						//Update layout
						$title.removeClass("mt-md-3");
						$titleColumn.removeClass("col-md-2").addClass("col-md-12");						
					}
				});

				// Initialize swiper function
				function initSwiperElements() {
					const desktopProductQuantity = $productGrid.attr('data-desktop-columns');
					const mobileProductQuantity = $productGrid.attr('data-mobile-slider-columns');
					const horizontalItem = $productGrid.attr("data-horizontal-item");

					let mobileSliderProductsAmount;
					let desktopSliderProductsAmount;

					if (horizontalItem == 'true') {
						mobileSliderProductsAmount = '1.15';
						desktopSliderProductsAmount = '3';
					}else{
						mobileSliderProductsAmount = mobileProductQuantity;
						desktopSliderProductsAmount = desktopProductQuantity;
					}
					$contentColumn.addClass("pr-0 pr-md-3");
					$titleColumn.addClass("pr-0 pr-md-3");
					$productGrid.addClass('swiper-wrapper').removeClass("row row-grid");

					// Wrap everything inside a swiper container
					$productGrid.wrapAll(`<div class="js-swiper-${settingSelector} swiper-container p-1"></div>`)

					// Wrap each product into a slide
					$productItem.removeClass("col-6 col-12 col-md-4 col-md-2 col-md-2-4 col-md-3").addClass("js-item-slide p-0").wrap(`<div class="swiper-slide"></div>`);
					$productItem.find(".js-item-container").addClass("mb-0");

					// Add previous and next controls

					$(`.js-swiper-${settingSelector}`).after(`
						<div class="js-swiper-${settingSelector}-prev swiper-button-prev swiper-button-outside d-none d-md-block svg-icon-text">
							<svg class="icon-inline icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M248.5,33.1a25.59,25.59,0,0,0-36.2,0L7.5,237.9a25.59,25.59,0,0,0,0,36.2L212.3,478.9a25.6,25.6,0,0,0,36.2-36.2L61.8,256,248.5,69.3A25.59,25.59,0,0,0,248.5,33.1Z"></path></svg>
						</div>
						<div class="js-swiper-${settingSelector}-next swiper-button-next swiper-button-outside d-none d-md-block svg-icon-text">
							<svg class="icon-inline icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M7.5,69.3,194.2,256,7.5,442.7a25.6,25.6,0,0,0,36.2,36.2L248.5,274.1a25.59,25.59,0,0,0,0-36.2L43.7,33.1A25.6,25.6,0,0,0,7.5,69.3Z"></path></svg>
						</div>
					`);

					// Initialize swiper
					createSwiper(`.js-swiper-${settingSelector}`, {
						lazy: true,
						watchOverflow: true,
						centerInsufficientSlides: true,
						threshold: 5,
						watchSlideProgress: true,
						watchSlidesVisibility: true,
						slideVisibleClass: 'js-swiper-slide-visible',
						spaceBetween: 15,
						loop: $productItem.length > 4,
						navigation: {
							nextEl: `.js-swiper-${settingSelector}-next`,
							prevEl: `.js-swiper-${settingSelector}-prev`
						},
						pagination: {
							el: `.js-swiper-${settingSelector}-pagination`,
							type: 'fraction',
						},
						slidesPerView: mobileSliderProductsAmount,
						breakpoints: {
							768: {
								slidesPerView: desktopSliderProductsAmount,
							}
						},
					},
					function(swiperInstance) {
						window[productSwiper] = swiperInstance;
					});
				}

				// Reset swiper function
				function resetSwiperElements() {
					const desktopProductQuantity = $productGrid.attr('data-desktop-columns');
					const mobileProductQuantity = $productGrid.attr('data-mobile-columns');
					const horizontalItem = $productGrid.attr("data-horizontal-item");

					// Remove duplicate slides and slider controls
					$contentColumn.removeClass("pr-0 pr-md-3");
					$titleColumn.removeClass("pr-0 pr-md-3");
					$productContainer.find(`.js-swiper-${settingSelector}-prev`).remove();
					$productContainer.find(`.js-swiper-${settingSelector}-next`).remove();
					$productGrid.find('.swiper-slide-duplicate').remove();
					$productGrid.addClass('row row-grid');

					// Undo all slider wrappers and restore original classes
					$productGrid.unwrap();
					$productItem.unwrap();
					$productItem.removeClass('js-item-slide p-0 swiper-slide').removeAttr('style');
					$productItem.find(".js-item-container").removeClass("mb-0");
					if(horizontalItem == 'false'){
						if (desktopProductQuantity == 6) {
							$productItem.addClass('col-md-2');
						} else if (desktopProductQuantity == 5) {
							$productItem.addClass('col-md-2-4');
						} else if (desktopProductQuantity == 4) {
							$productItem.addClass('col-md-3');
						}

						if (mobileProductQuantity == 1) {
							$productItem.addClass('col-12');

						} else if (mobileProductQuantity == 2) {
							$productItem.addClass('col-6');
						}
					}else{
						$productItem.addClass("col-12 col-md-4");
					}
				}

				// Toggle grid and slider view
				handlers[`${setting}_products_format`] = new instaElements.Lambda(function(format){
					const toSlider = format == "slider";

					if ($productGrid.attr('data-format') == format) {
						// Nothing to do
						return;
					}

					// From grid to slider
					if (toSlider) {
						$productGrid.attr('data-format', 'slider');

						// Convert grid to slider if it's not yet
						if ($productContainer.find('.swiper-slide').length < 1) {
							initSwiperElements();
						}

						$section.find(".js-products-section-image").removeClass("h-auto");

					// From slider to grid
					} else {
						$productGrid.attr('data-format', 'grid');
						
						// Reset swiper settings
						resetSwiperElements();

						$section.find(".js-products-section-image").addClass("h-auto");

						// Restore grid settings
						$productGrid.removeClass('swiper-wrapper').removeAttr('style');
					}

					// Persist new format in data attribute
					$productGrid.attr('data-format', format);
				});

				// Updates section colors
				handlers[`${setting}_product_colors`] = new instaElements.Lambda(function(sectionColor){
					if (sectionColor) {
						$section.addClass(`section-${settingSelector}-products-home-colors`);
					} else {
						$section.removeClass(`section-${settingSelector}-products-home-colors`);
					}
				});

				// Update section image visibility depending on device sibling image
				function updateImageClasses(thisImage, imageType) {
					const desktopImageVisible = $productContainer.attr("data-image-desktop");
					const mobileImageVisible = $productContainer.attr("data-image-mobile");
					const productFormat = $productGrid.attr('data-format');
					const desktopImage = `.js-products-${settingSelector}-desktop-image`;
					const mobileImage = `.js-products-${settingSelector}-mobile-image`;

					if(imageType == 'desktop'){
						if(mobileImageVisible == 'true'){
							$(thisImage).addClass("d-none d-md-block");
							$(mobileImage).addClass("d-block d-md-none");
						}else{
							$(thisImage).removeClass("d-none d-md-none");
							$(mobileImage).removeClass("d-block d-md-none");
						}
					}else{
						if(desktopImageVisible == 'true'){
							$(thisImage).addClass("d-block d-md-none");
							$(desktopImage).addClass("d-none d-md-block");
						}else{
							$(thisImage).removeClass("d-block d-md-none");
							$(desktopImage).removeClass("d-none d-md-block");
						}
					}
					if(productFormat == 'grid'){
						$(thisImage).addClass("h-auto");
					}else{
						$(thisImage).removeClass("h-auto");
					}
				}

				// Updates section desktop image
				handlers[`${setting}_product_image.jpg`] = new instaElements.Image({
					element: `.js-products-${settingSelector}-desktop-image`,
					show: function() {
						$(this).show();
						$productContainer.attr("data-image-desktop" , "true");
						updateImageClasses(this, 'desktop');
					},
					hide: function() {
						const mobileImage = `.js-products-${settingSelector}-mobile-image`;
						$(this).hide().removeClass("d-none d-block d-md-none d-md-block");
						$productContainer.attr("data-image-desktop" , "false");
						updateImageClasses(mobileImage);
					},
				});

				// Updates section mobile image
				handlers[`${setting}_product_image_mobile.jpg`] = new instaElements.Image({
					element: `.js-products-${settingSelector}-mobile-image`,
					show: function() {
						$(this).show();
						$productContainer.attr("data-image-mobile" , "true");
						updateImageClasses(this);
					},
					hide: function() {
						const desktopImage = `.js-products-${settingSelector}-desktop-image`;
						$(this).hide().removeClass("d-none d-block d-md-none d-md-block");;
						$productContainer.attr("data-image-mobile" , "false");
						updateImageClasses(desktopImage, 'desktop');
					},
				});
			});

			return handlers;
		}
	};
})(jQueryNuvem);