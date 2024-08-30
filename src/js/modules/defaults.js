import { config } from "../config";
var defaults = {

	events: () => {
		function smoothScrollTo(target, duration = 1000) {
			const targetPosition = target.getBoundingClientRect().top;
			const startPosition = window.pageYOffset;
			let startTime = null;

			function animation(currentTime) {
				if (startTime === null) startTime = currentTime;
				const timeElapsed = currentTime - startTime;
				const run = ease(timeElapsed, startPosition, targetPosition, duration);
				window.scrollTo(0, run);
				if (timeElapsed < duration) requestAnimationFrame(animation);
			}

			function ease(t, b, c, d) {
				t /= d / 2;
				if (t < 1) return c / 2 * t * t + b;
				t--;
				return -c / 2 * (t * (t - 2) - 1) + b;
			}

			requestAnimationFrame(animation);
		}

		document.querySelectorAll(".js-link").forEach(link => {
			link.addEventListener('click', function (e) {
				e.preventDefault();

				const aid = this.getAttribute("href");
				const target = document.querySelector(aid);

				if (target) {
					smoothScrollTo(target);
					history.pushState(null, null, aid);
				} else {
					console.error('Target element not found:', aid);
				}
			});
		});

		if (window.location.hash) {
			window.scrollTo(0, 0);

			setTimeout(function () {
				const target = document.querySelector(window.location.hash);
				if (target) {
					smoothScrollTo(target);
				}
			}, 100);
		}

		let resizeTimer;
		config.addListenerMulti(window, 'resize load', () => {
			const updatePaddingTop = () => {
				const headerHeight = config.header.offsetHeight;
				const root = document.querySelector(':root');
				root.style.setProperty('--padding-top', `${headerHeight}px`);
			};

			if (resizeTimer) {
				cancelAnimationFrame(resizeTimer);
			}

			resizeTimer = requestAnimationFrame(updatePaddingTop);
		});
	},

	init: () => {

		defaults.events();

	}
}

export { defaults }