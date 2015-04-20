$(function () {

	'use strict';

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

});
