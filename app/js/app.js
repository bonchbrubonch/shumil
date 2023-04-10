$(function () {
	gsap.registerPlugin(ScrollTrigger);

	const mobile = window.innerWidth < 1200;

	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('header').addClass('sticky');
		} else {
			$('header').removeClass('sticky');
		}
	});

	// анимации на главной
	if (!!document.querySelector('.present')) {
		const img = document.querySelector('.present__img');
		const menu = document.querySelector('.header');

		if (!mobile) {
			// фиксируем изображение
			gsap.set('.present__img', {
				top:
					window.innerHeight / 2 -
					img.getBoundingClientRect().height / 2 +
					menu.getBoundingClientRect().height / 2,
			});

			// анимация сообщений в первом блоке
			gsap
				.timeline({ repeat: -1 })
				// .from('#present_msg', .5, {autoAlpha: 0})
				.to('#present_msg_1 .chat-widget__write', 0.5, { autoAlpha: 0 }, 12.5)
				.from('#present_msg_1 .chat-widget__content', 0.5, { height: 50 }, 12.5)
				.from('#present_msg_1 .chat-widget__content', 0.5, { autoAlpha: 0 })
				.to('#present_msg_1', 0.5, { marginBottom: 30 })
				.from('#present_msg_2', 0.5, { height: 0 }, '-=.5')
				.from('#present_msg_2', 0.5, { autoAlpha: 0 })
				.to('#present_msg_2', 12, { autoAlpha: 1 });
			// .to('#present_msg', .5, {autoAlpha: 0})
			// .to('#present_msg', .5, {height: 89})
		} else {
			ScrollTrigger.create({
				trigger: '.present__mobile-img',
				start: 'center center',
				endTrigger: '#present_chat',
				end: 'center center',
				pin: '.present__mobile-img',
				pinSpacing: false,
			});
			gsap.to('.present__mobile-img', {
				scrollTrigger: {
					trigger: '.present__mobile-img',
					start: 'center center',
					endTrigger: '#present_chat',
					end: 'center center',
					scrub: true,
				},
				autoAlpha: 0,
			});
			gsap.to('#present_hello, #present_name', {
				scrollTrigger: {
					trigger: '.present__mobile-img',
					start: 'center center',
					endTrigger: '#present_name',
					end: 'center center',
					scrub: true,
				},
				autoAlpha: 0,
			});

			gsap.from('#present_chat', {
				autoAlpha: 0,
				repeat: 1,
				yoyo: true,
				scrollTrigger: {
					trigger: '#present_chat',
					start: 'top center',
					end: 'bottom center',
					scrub: true,
				},
			});

			ScrollTrigger.create({
				trigger: '#present_chat',
				start: 'center center',
				pin: '#present_chat',
				pinSpacing: false,
				endTrigger: '#present_history',
				end: 'center center',
			});

			gsap.from('#present_history', {
				autoAlpha: 0,
				scrollTrigger: {
					trigger: '#present_history',
					start: 'top center',
					end: 'center center',
					scrub: true,
				},
			});
		}
	}

	if (!!document.querySelector('#exp_msg')) {
		gsap
			.timeline({
				scrollTrigger: {
					trigger: '#exp_msg',
					start: 'bottom bottom',
				},
			})

			.from('#exp_msg_1 .chat-widget__content', 0.5, { height: 50 }, 12)
			.from('#exp_msg_1 .chat-widget__content', 0.5, { autoAlpha: 0 })
			.to('#exp_msg_1 .chat-widget__write', 0.5, { autoAlpha: 0 }, '-=.5')
			.to('#exp_status', 0.5, { autoAlpha: 0 })
			.to('#exp_name', 0.5, { yPercent: 50 }, '-=.5');
	}

	if (!!document.querySelector('#cashback_msg')) {
		gsap
			.timeline({
				scrollTrigger: {
					trigger: '#cashback_trigger',
					start: 'bottom bottom',
				},
			})
			.from('#cashback_msg_1 .chat-widget__content', 0.5, { height: 50 }, 12)
			.from('#cashback_msg_1 .chat-widget__content', 0.5, { autoAlpha: 0 })
			.to('#cashback_msg_1 .chat-widget__write', 0.5, { autoAlpha: 0 }, '-=.5')
			.to('#cashback_status', 0.5, { autoAlpha: 0 })
			.to('#cashback_name', 0.5, { yPercent: 50 });
	}

	// индикатор написания сообщения
	if (!!document.querySelectorAll('.chat-widget__write')) {
		const preloaders = document.querySelectorAll('.chat-widget__write');
		preloaders.forEach((p) => {
			const hand = p.querySelector('.chat-widget__hand'),
				dots = p.querySelectorAll('.chat-widget__dot');
			gsap
				.timeline({ repeat: -1 })
				.from(hand, 4, { left: 0 }, 0)
				.from(dots, 0.75, { autoAlpha: 0, yPercent: -100, stagger: 0.75 }, 0);
		});
	}

	// анимация блокнота
	if (!!document.querySelector('.notebook')) {
		const notebook_img = document.querySelector('.notebook__right');

		if (!mobile) {
			gsap.set(notebook_img, {
				top:
					window.innerHeight / 2 -
					notebook_img.getBoundingClientRect().height / 2 +
					50,
			});
			gsap.from('.notebook__right-list', {
				scrollTrigger: {
					trigger: '#notebook_content_1',
					start: 'top center',
					endTrigger: '#notebook_content_3',
					end: 'bottom center',
					scrub: true,
				},
				autoAlpha: 0,
				stagger: 0.5,
			});
		} else {
			// анаимация списка в блокноте
			gsap.from('.notebook__right-list', {
				scrollTrigger: {
					trigger: '#notebook_content_1',
					start: 'top center',
					endTrigger: '#notebook_content_3',
					end: 'bottom+=400px center',
					scrub: true,
				},
				autoAlpha: 0,
				stagger: 0.5,
			});

			// фиксация блокнота
			ScrollTrigger.create({
				trigger: '.notebook__right',
				start: 'center 20%',
				endTrigger: '#notebook_content_3',
				end: 'bottom+=450px center',
				pin: '.notebook__right',
			});

			// первая секция с заголовком
			gsap.from('#notebook_content_inner', {
				autoAlpha: 0,
				repeat: 1,
				yoyo: true,
				scrollTrigger: {
					trigger: '#notebook_content',
					start: 'top center',
					end: 'bottom center',
					scrub: true,
				},
			});

			ScrollTrigger.create({
				trigger: '#notebook_content_inner',
				start: 'center center',
				endTrigger: '#notebook_content',
				end: 'bottom center',
				pin: '#notebook_content_inner',
			});

			// вторая секция с заголовком
			gsap.from('#notebook_content_1_inner', {
				autoAlpha: 0,
				repeat: 1,
				yoyo: true,
				scrollTrigger: {
					trigger: '#notebook_content_1',
					start: 'top center',
					end: 'bottom center',
					scrub: true,
				},
			});

			ScrollTrigger.create({
				trigger: '#notebook_content_1_inner',
				start: 'center center',
				endTrigger: '#notebook_content_1',
				end: 'bottom center',
				pin: '#notebook_content_1_inner',
			});

			// третья секция с заголовком
			gsap.from('#notebook_content_2_inner', {
				autoAlpha: 0,
				repeat: 1,
				yoyo: true,
				scrollTrigger: {
					trigger: '#notebook_content_2',
					start: 'top center',
					end: 'bottom center',
					scrub: true,
				},
			});

			ScrollTrigger.create({
				trigger: '#notebook_content_2_inner',
				start: 'center center',
				endTrigger: '#notebook_content_2',
				end: 'bottom center',
				pin: '#notebook_content_2_inner',
			});

			// четвертая секция с заголовком
			gsap.from('#notebook_content_3_inner', {
				autoAlpha: 0,
				scrollTrigger: {
					trigger: '#notebook_content_3',
					start: 'top center',
					end: 'bottom center',
					scrub: true,
				},
			});

			ScrollTrigger.create({
				trigger: '#notebook_content_3_inner',
				start: 'center center',
				endTrigger: '#notebook_content_3',
				end: 'bottom center',
				pin: '#notebook_content_3_inner',
			});
		}
	}

	// анимация приложения
	if (!!document.querySelector('.escort')) {
		gsap
			.timeline({ repeat: -1 })
			.to('.gear_1', 4, { rotate: 360, ease: 'linear' }, 0)
			.to('.gear_2', 4, { rotate: -360, ease: 'linear' }, 0);

		if (!mobile) {
			const app_preview = document.querySelector('.escort__right');
			gsap.set(app_preview, {
				top:
					window.innerHeight / 2 -
					app_preview.getBoundingClientRect().height / 2 +
					50,
			});

			// gsap.to('')

			gsap
				.timeline({
					scrollTrigger: {
						trigger: '#app_content_2',
						start: `top-=${window.innerHeight / 2}px center`,
						end: 'top+=100px center',
						scrub: true,
					},
				})
				.to('#app_1 .escort__right-done', 0.5, {
					clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
				})
				.to('#app_1', 0.5, { autoAlpha: 0 }, '-=.5')
				.from('#app_2', { autoAlpha: 0 }, '+=2')
				.from('#app_2 .escort__right-list li', 0.5, {
					autoAlpha: 0,
					stagger: 0.1,
				});

			gsap
				.timeline({
					scrollTrigger: {
						trigger: '#app_content_3',
						start: `top-=${window.innerHeight / 2}px center`,
						end: 'top+=100px center',
						scrub: true,
					},
				})
				.to('#app_2', { autoAlpha: 0 })
				.from('#app_3', { autoAlpha: 0 }, '+=2')
				.from('#app_3 .escort__right-list li', 0.5, {
					autoAlpha: 0,
					stagger: 0.1,
				});

			gsap
				.timeline({
					scrollTrigger: {
						trigger: '#app_content_4',
						start: `top-=${window.innerHeight / 2}px center`,
						end: 'top+=100px center',
						scrub: true,
					},
				})
				.to('#app_3', { autoAlpha: 0 })
				.from('#app_4', { autoAlpha: 0 }, '+=2')
				.from('#app_4 .escort__right-list li', 0.5, {
					autoAlpha: 0,
					stagger: 0.1,
				});

			gsap
				.timeline({
					scrollTrigger: {
						trigger: '#app_content_5',
						start: `top-=${window.innerHeight / 2}px center`,
						end: 'top+=100px center',
						scrub: true,
					},
				})
				.to('#app_4', { autoAlpha: 0 })
				.from('#app_5', { autoAlpha: 0 }, '+=2');

			gsap
				.timeline({
					scrollTrigger: {
						trigger: '#app_content_6',
						start: `top-=${window.innerHeight / 2}px center`,
						end: 'top+=100px center',
						scrub: true,
					},
				})
				.to('#app_5 .escort__right-done', 0.5, {
					clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
				})
				.to('#app_5', 0.5, { autoAlpha: 0 }, '-=.5')
				.from('#app_6', { autoAlpha: 0 }, '+=2')
				.from('#app_6 .escort__right-list li', 0.5, {
					autoAlpha: 0,
					stagger: 0.1,
				});
		} else {
			gsap.set('#app_2, #app_3, #app_4, #app_5, #app_6', { autoAlpha: 0 });

			gsap.to('.escort__right-done', {
				clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
				scrollTrigger: {
					trigger: '.escort__right',
					start: 'top center',
					end: 'bottom center',
					scrub: true,
				},
			});
		}

		// gsap.timeline({
		//   ease: 'steps(5)',
		//   scrollTrigger: {
		//     trigger: '.escort__box',
		//     start: '5% center',
		//     end: '75% center',
		//     scrub: .5
		//   },
		// })
		// .to('#app_1', .5, {autoAlpha: 0})
		// .from('#app_2', .5, {autoAlpha: 0})
		// .from('#app_2 .escort__right-list li', .5, {autoAlpha: 0, stagger: .1})
		// .to('#app_2', .5, {autoAlpha: 0}, '+=3')
		// .from('#app_3', .5, {autoAlpha: 0})
		// .from('#app_3 .escort__right-list li', .5, {autoAlpha: 0, stagger: .1})
		// .to('#app_3', .5, {autoAlpha: 0}, '+=2.5')
		// .from('#app_4', .5, {autoAlpha: 0})
		// .from('#app_4 .escort__right-list li', .5, {autoAlpha: 0, stagger: .1})
		// .to('#app_4', .5, {autoAlpha: 0}, '+=2')
		// .from('#app_5', .5, {autoAlpha: 0})
		// .to('#app_5', .5, {autoAlpha: 0}, '+=2')
		// .from('#app_6', .5, {autoAlpha: 0})
		// .from('#app_6 .escort__right-list li', .5, {autoAlpha: 0, stagger: .1})
	}

	if (!!document.querySelector('#contact_msg')) {
		gsap
			.timeline({
				scrollTrigger: {
					trigger: '#contact_msg',
					start: 'top bottom',
				},
			})
			.from('#contact_msg_1 .chat-widget__content', 0.5, { height: 50 }, 12)
			.from('#contact_msg_1 .chat-widget__content', 0.5, { autoAlpha: 0 })
			.from('#contact_msg_2', 0.5, { autoAlpha: 0 })
			.from('#contact_msg_2 .chat-widget__content', 0.5, { height: 50 }, '+=12')
			.from('#contact_msg_2 .chat-widget__content', 0.5, { autoAlpha: 0 })
			.from('#contact_msg_3', 0.5, { autoAlpha: 0 })
			.from('#contact_msg_3 .chat-widget__content', 0.5, { height: 50 }, '+=12')
			.from('#contact_msg_3 .chat-widget__content', 0.5, { autoAlpha: 0 })
			.from('#contact_msg_4', 0.5, { autoAlpha: 0 })
			.from('#contact_msg_4 .chat-widget__content', 0.5, { height: 50 }, '+=12')
			.from('#contact_msg_4 .chat-widget__content', 0.5, { autoAlpha: 0 });
	}

	if (!!document.querySelector('.consider')) {
		if (!mobile) {
			gsap.to('#men_1 img', {
				scrollTrigger: {
					trigger: '#con_why',
					start: 'center center',
					end: 'bottom center',
					pin: '#men_1',
					scrub: true,
					pinType: 'transform',
					pinSpacing: false,
				},
				autoAlpha: 0,
			});

			const sections_id = [
				'con_exp',
				'con_digital',
				'cashback_trigger',
				'con_methods',
				'con_conv',
				'con_fast',
				'con_team',
				'consider_end',
			];

			sections_id.forEach((s) => {
				// section
				gsap.from(`#${s} .consider__right`, {
					scrollTrigger: {
						trigger: `#${s}`,
						start: 'top center',
						end: 'bottom center',
						scrub: true,
						pinType: 'fixed',
						pinSpacing: false,
						anticipatePin: 1,
					},
					autoAlpha: 0,
					repeat: 1,
					yoyo: 1,
				});

				if (s !== 'consider_end') {
					gsap.to(s, {
						scrollTrigger: {
							trigger: `#${s}`,
							start: 'center center',
							pin: `#${s} .consider__right`,
							endTrigger: `#${s}`,
							end: 'bottom center',
							pinType: 'fixed',
							pinSpacing: false,
							anticipatePin: 1,
						},
						autoAlpha: 1,
					});
				}
			});
		} else {
			gsap.to('#con_why', {
				autoAlpha: 0,
				scrollTrigger: {
					trigger: '#con_why',
					start: 'center center',
					end: 'bottom center',
					pin: '#con_why',
					pinSpacing: false,
					pinType: 'transform',
					scrub: true,
				},
			});

			const slides = document.querySelectorAll('.over_slide');

			slides.forEach((s, i) => {
				gsap.from(s, {
					autoAlpha: 0,
					repeat: i === slides.length - 1 ? 0 : 1,
					yoyo: i === slides.length - 1 ? false : true,
					scrollTrigger: {
						trigger: s,
						start: 'top center',
						end: i === slides.length - 1 ? 'center center' : 'bottom center',
						scrub: true,
					},
				});

				if (i !== slides.length - 1) {
					ScrollTrigger.create({
						trigger: s,
						pin: s,
						start: 'center center',
						end: 'bottom+=100px center',
						scrub: true,
						pinSpacing: false,
					});
				}
			});
		}
	}

	//анимация на секцию present
	// const container = gsap.utils.toArray(".present__left");
	// container.forEach((container) => {
	//   let t2 = gsap.timeline({
	//     scrollTrigger: {
	//       trigger: container,
	//       pin: true,
	//       scrub: true
	//     }
	//   });

	//   t2.to(container, {
	//     autoAlpha: 1
	//   }).to(
	//     container,
	//     {
	//       autoAlpha: 0
	//     },
	//     0.8
	//   );
	// });

	//анимация на секцию consider
	// const containers = gsap.utils.toArray(".consider__right");
	// containers.forEach((container) => {
	//   let tl = gsap.timeline({
	//     scrollTrigger: {
	//       trigger: container,
	//       pin: true,
	//       scrub: true
	//     }
	//   });

	//   tl.to(container, {
	//     autoAlpha: 1
	//   }).to(
	//     container,
	//     {
	//       autoAlpha: 0
	//     },
	//     0.8
	//   );
	// });

	// function resize() {
	//   if ( $(window).width() < 1100) {
	//     const containers = gsap.utils.toArray(".consider__box");
	//     containers.forEach((container) => {
	//       let tl = gsap.timeline({
	//         scrollTrigger: {
	//           trigger: container,
	//           pin: true,
	//           scrub: true
	//         }
	//       });

	//       tl.to(container, {
	//         autoAlpha: 1
	//       }).to(
	//         container,
	//         {
	//           autoAlpha: 0
	//         },
	//         0.8
	//       );
	//     });
	//   }
	// }
	// $(window).on("resize", resize);
	// resize();

	let isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (
				isMobile.Android() ||
				isMobile.BlackBerry() ||
				isMobile.iOS() ||
				isMobile.Opera() ||
				isMobile.Windows()
			);
		},
	};
	let body = document.querySelector('body');
	if (isMobile.any()) {
		body.classList.add('touch');
		let arrow = document.querySelectorAll('.arrow-mob');
		let i;
		for (i = 0; i < arrow.length; i++) {
			let thisLink = arrow[i].previousElementSibling;
			let subMenu = arrow[i].nextElementSibling;
			let thisArrow = arrow[i];

			thisLink.classList.add('parent');
			arrow[i].addEventListener('click', function () {
				subMenu.classList.toggle('open');
				thisArrow.classList.toggle('active');
			});
		}
	} else {
		body.classList.add('mouse');
	}

	//аккордеон

	if ($('.questions__item-title').length > 0) {
		$('.questions__item-title').on('click', function () {
			$('.questions__item').removeClass('questions__item--active');
			$(this).parent().addClass('questions__item--active');
		});
	}

	//слайдер
	if ($('.review-slider').length > 0) {
		$('.review-slider').slick({
			prevArrow:
				'<button class="arrow-phone slider-left"><svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.91602 2.12939L2.00023 10.1294L9.91602 18.1294" stroke="#528DFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
			nextArrow:
				'<button class="arrow-phone slider-right"><svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2.12939L9.91579 10.1294L2 18.1294" stroke="#528DFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			centerMode: true,
			variableWidth: true,
		});
	}

	//стрпелки к слайдеру
	$('.arrow-phone').click(function () {
		$('.arrow-phone').removeClass('active');
		$(this).addClass('active');
	});

	//селект мобильной версии
	$('.articl__select').on('click', function () {
		$('.articl__select').toggleClass('articl__select-active');
		$('.articl__buttons').toggleClass('articl__buttons-active');
	});

	//слайдер
	if ($('.slider-articl__top').length > 0) {
		$('.slider-articl__top').slick({
			prevArrow:
				'<button class="top-left"><svg width="8" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 11L2 6l5-5" stroke="#fff" stroke-width="2"/></svg></button>',
			nextArrow:
				'<button class="top-right"><svg width="8" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l5 5-5 5" stroke="#fff" stroke-width="2"/></svg></button>',
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			arrows: true,
			fade: true,
			centerMode: true,
			asNavFor: '.slider-articl__bottom',
		});
		$('.slider-articl__bottom').slick({
			prevArrow:
				'<button class="bottom-left"><svg width="11" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 1L2 11l8 10" stroke="#909090" stroke-width="2"/></svg></button>',
			nextArrow:
				'<button class="bottom-right"><svg width="11" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 21l8-10L1 1" stroke="#909090" stroke-width="2"/></svg></button>',
			asNavFor: '.slider-articl__top',
			dots: false,
			arrows: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			variableWidth: true,
		});
	}

	//мобильное меню
	$('.menu__btn').on('click', function () {
		$('.menu__btn').toggleClass('menu__btn--active');
		$('.header__menu').toggleClass('active');
	});

	$('.menu-item-has-children a').on('click', function () {
		$(this).next().toggleClass('sub-menu--active');
	});

	//эмблема
	if ($('.emblem').length > 0) {
		var Emblem = {
			init: function (el, str) {
				var element = document.querySelector(el);
				var text = str ? str : element.innerHTML;
				element.innerHTML = '';
				for (var i = 0; i < text.length; i++) {
					var letter = text[i];
					var span = document.createElement('span');
					var node = document.createTextNode(letter);
					var r = (360 / text.length) * i;
					var x = (Math.PI / text.length).toFixed(0) * i;
					var y = (Math.PI / text.length).toFixed(0) * i;
					span.appendChild(node);
					span.style.webkitTransform =
						'rotateZ(' + r + 'deg) translate3d(' + x + 'px,' + y + 'px,0)';
					span.style.transform =
						'rotateZ(' + r + 'deg) translate3d(' + x + 'px,' + y + 'px,0)';
					element.appendChild(span);
				}
			},
		};

		Emblem.init('.emblem');
	}

	//эмблема
	if ($('.emblems').length > 0) {
		var Emblem = {
			init: function (el, str) {
				var element = document.querySelector(el);
				var text = str ? str : element.innerHTML;
				element.innerHTML = '';
				for (var i = 0; i < text.length; i++) {
					var letter = text[i];
					var span = document.createElement('span');
					var node = document.createTextNode(letter);
					var r = (360 / text.length) * i;
					var x = (Math.PI / text.length).toFixed(0) * i;
					var y = (Math.PI / text.length).toFixed(0) * i;
					span.appendChild(node);
					span.style.webkitTransform =
						'rotateZ(' + r + 'deg) translate3d(' + x + 'px,' + y + 'px,0)';
					span.style.transform =
						'rotateZ(' + r + 'deg) translate3d(' + x + 'px,' + y + 'px,0)';
					element.appendChild(span);
				}
			},
		};

		Emblem.init('.emblems');
	}

	//устанавливаем маску телефона
	$('.formPhone').inputmask({ mask: '+7 (999) 999-99-99' });

	//паралакс
	if ($('#scene').length > 0) {
		var scene = document.getElementById('scene');
		var parallax = new Parallax(scene);
	}

	//фильтр на статьи
	if ($('.articl__box').length > 0) {
		var mixer = mixitup('.articl__box', {
			load: {
				filter: 'all',
			},
		});
	}
});

//фильтр на статьи
// var mixer = mixitup('.articl__box', {
//   load: {
//     filter: "all",
//   }
// });

// var scene = document.getElementById('scene');
// var parallax = new Parallax(scene);
