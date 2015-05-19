$(function () {

	'use strict';

	menuCount();

	// слайдер на главной странице

	var mainSlider;

	mainSlider = new Swiper ('.swiper-container', {
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
				bottom: 20,
				left: 0
			}
		});
	});

	// табы для личного кабинета

	$.ionTabs('#tabsCabinetMode', {
		type: 'none'
	});

	// переключение списка пользователей

	var $tableItems = $('.js-table-row'),
		tableItemsActiveClass = 'cabinet__table-row_state_active';

	$tableItems.each(function () {
		var $this = $(this)
		$this.on('click', function () {
			$this.addClass(tableItemsActiveClass);
			$this.siblings().removeClass(tableItemsActiveClass);
		})
	})

});
