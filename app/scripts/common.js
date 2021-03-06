$(function () {

	'use strict';

	menuCount();

	// информационный попап

	var $popupOpen = $('.js-advert-info'),
		$popup = $popupOpen.find('.new-advert__obj-popup');

	$popupOpen.each(function () {
		var $popupClose = $(this).find('.new-advert__obj-popup-close');

		$(this).on('click', function (event) {
			event.stopPropagation();
			$popup.hide();
			$(this).find('.new-advert__obj-popup').show();
			$popupClose.on('click', function (event) {
				event.stopPropagation();
				$popup.hide();
			});

			$('html, body').on('click', function () {
				$popup.hide();
			});
		});
	});

	// автозаполнение региона

	var $searchInput = $('.js-input-search'),
		searchDictionary = [];

	$.getJSON('data/regions.json', function (data) {
		searchDictionary = data.regions;

		$searchInput.each(function () {
			var $this = $(this);
			$this.autocomplete({
				source: searchDictionary,
				appendTo: $this.parent(),
				minLength: 2,
				create: function () {
					$this.next().niceScroll({
						cursorcolor: '#39b54a',
						cursorwidth: '12px',
						cursorborderradius: '4px',
						cursorminheight: 86,
						autohidemode: 'cursor',
						railoffset: true,
						railpadding: {
							top: 5,
							right: 2,
							bottom: 10,
							left: 0
						}
					});
				},
				open: function () {
					$this.addClass('input_regions');
				},
				close: function () {
					$this.removeClass('input_regions');
				}
			});
		});

	});

	// календарь

	var $calendar = $('#calendar');

	$calendar.datepicker({
		dateFormat: 'd MM, yy',
		firstDay: 1,
		showOtherMonths: true,
		selectOtherMonths: false,
		nextText: '',
		prevText: '',
		showAnim: 'slideDown',
		beforeShow: function () {
			$calendar.addClass('input_calendar');
		},
		onClose: function () {
			$calendar.removeClass('input_calendar');
		}
	});

	// кастомные селекты

	$('.jelect').jelect();

	// слайдер на главной странице

	var mainSlider, objSlider, cardSlider;

	mainSlider = new Swiper ('.main-slider', {
		direction: 'horizontal',
		speed: 500,
		loop: true,
		simulateTouch: false,
		pagination: '.main-slider__pag',
		paginationHide: false,
		paginationClickable: true,
		nextButton: '.main-slider__next',
		prevButton: '.main-slider__prev'
	});

	// слайдер в карточке объекта

	objSlider = new Swiper ('.new-advert__obj-slider', {
		initialSlide: 0,
		direction: 'horizontal',
		speed: 500,
		spaceBetween: 15,
		slidesPerView: 3,
		simulateTouch: false,
		nextButton: '.new-advert__obj-right',
		prevButton: '.new-advert__obj-left'
	});

	cardSlider = new Swiper ('.card__img-slider', {
		initialSlide: 0,
		direction: 'horizontal',
		speed: 500,
		spaceBetween: 25,
		slidesPerView: 3,
		simulateTouch: false,
		nextButton: '.card__img-next',
		prevButton: '.card__img-prev'
	});

	// удаление слайдов

	var $slideDel = $('.js-slide-del'),
		slideCloseClass = 'new-advert__obj-slide_state_close',
		slideDelHideClass = 'new-advert__obj-close_state_hide';

	$slideDel.each(function () {

		$(this).on('click', function () {
			var $this = $(this),
				slideIndex = $this.parent().parent().index();

			$this.addClass(slideDelHideClass);
			$this.parent().addClass(slideCloseClass);

			setTimeout(function () {
				objSlider.removeSlide(slideIndex);
			}, 500);
		});
	});

	// счетсик в меню, склонение слова "объявлений"

	function menuCount() {
		var $count = $('.js-menu-count'),
			txt1 = 'объявление',
			txt2 = 'объявления',
			txt3 = 'объявлений';

		$count.each(function () {
			var num = parseInt($(this).html()),
				numRes = num % 10;

			if (
				numRes === 1 &&
				num !== 11
				) {

					$(this).next().html(txt1);

			} else if (
				(numRes === 2 || numRes === 3 || numRes === 4) &&
				num !== 12 && num !== 13 && num !== 14
				) {

					$(this).next().html(txt2);

			} else {

				$(this).next().html(txt3);
			}
		});
	}

	// скроллбар

	var $scrollContainer = $('.js-scroll-cont');

	$scrollContainer.each(function () {
		$(this).niceScroll({
			cursorcolor: '#39b54a',
			cursorwidth: '12px',
			cursorborderradius: '4px',
			cursorminheight: 86,
			autohidemode: 'cursor',
			railoffset: true,
			railpadding: {
				top: 20,
				right: 2,
				bottom: 65,
				left: 0
			}
		});
	});

	// прогрессбар на странице "новое объявление"

	var $progItem = $('.js-advert-prog'),
		progItemActiveClass = 'new-advert__prog-item_state_active';

	$progItem.on('click', function () {
		$(this).siblings().removeClass(progItemActiveClass);
		$(this).addClass(progItemActiveClass);
	});


	// табы для личного кабинета

	$.ionTabs('#tabsCabinetMode', {
		type: 'none'
	});

	// табы для меню поиска

	$.ionTabs('#tabsMenuSearch', {
		type: 'hash'
	});

	// переключение списка пользователей

	var $tableItems = $('.js-table-row'),
		tableItemsActiveClass = 'cabinet__table-row_state_active';

	$tableItems.each(function () {
		var $this = $(this);
		$this.on('click', function () {
			$this.addClass(tableItemsActiveClass);
			$this.siblings().removeClass(tableItemsActiveClass);
		});
	});

	// переключение контактных данных

	var $contacts = $('.js-contact'),
		contactActiveClass = 'contact_state_active';

	$contacts.each(function () {
		var $this = $(this);
		$this.on('click', function () {
			$this.addClass(contactActiveClass);
			$this.siblings().removeClass(contactActiveClass);
		});
	});

	// переключение шаблонов

	var $templ = $('.js-templ-item'),
		$templHeader = $('.new-advert__templ-header'),
		templActiveClass = 'new-advert__templ-item_state_active';

	$templ.each(function () {
		var $this = $(this);
		$this.on('click', function () {
			$this.addClass(templActiveClass);
			$this.siblings().not($templHeader).removeClass(templActiveClass);
		});
	});

});
