
var config = {

	debug: true,

	animationEnd: "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",

	transitionEnd: "transitionend webkitTransitionEnd oTransitionEnd",

	body: document.body,

	html: document.documentElement,

	header: document.querySelector('header'),

	getRandomInt: (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	log: (...args) => {

		if (!config.debug)
			return false;

		console.log(...args);

	},

	URLToArray: url => {

		const request = {};
		const pairs = url.substring(url.indexOf('?') + 1).split('&');
		for (let i = 0; i < pairs.length; i++) {
			if (!pairs[i])
				continue;
			const pair = pairs[i].split('=');
			request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
		}
		return request;
	},

	ArrayToURL: array => {
		const pairs = [];
		for (const key in array)
			if (array.hasOwnProperty(key))
				pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(array[key]));

		return pairs.join('&');
	},

	numberWithSpaces: x => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	},

	delay: (fn, ms) => {
		let timer = 0;
		return function (...args) {
			clearTimeout(timer);
			timer = setTimeout(fn.bind(this, ...args), ms || 0);
		}
	},

	debounce: (func, wait) => {
		let timeout;
		return function(...args) {
			const later = () => {
				clearTimeout(timeout);
				func.apply(this, args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	},

	guidGenerator: () => {
		const S4 = function () {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};
		return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	},

	addListenerMulti: (element, eventNames, listener) => {
		const events = eventNames.split(' ');
		events.forEach(event => element.addEventListener(event, listener, false));
	},

	scrollbarWidth: () => {
		const documentWidth = parseInt(document.documentElement.clientWidth);
		const windowsWidth = parseInt(window.innerWidth);
		const scrollbarWidth = windowsWidth - documentWidth;
		return scrollbarWidth;
	},

	slideToggle: (element, duration = 300) => {
		let el = document.querySelector(element);
		let elStyle = window.getComputedStyle(el);
		let elHeight = el.offsetHeight;
		let elDisplay = elStyle.display;

		if (elDisplay === 'none') {
			el.style.display = 'block';
			el.style.height = '0px';
			el.style.overflow = 'hidden';
			let targetHeight = el.scrollHeight;

			let startTime = performance.now();

			function slideDown(currentTime) {
				let elapsedTime = currentTime - startTime;
				let progress = elapsedTime / duration;
				el.style.height = Math.min(progress * targetHeight, targetHeight) + 'px';

				if (progress < 1) {
					requestAnimationFrame(slideDown);
				} else {
					el.style.height = '';
					el.style.overflow = '';
				}
			}
			requestAnimationFrame(slideDown);
		} else {
			let startHeight = elHeight;
			let startTime = performance.now();

			function slideUp(currentTime) {
				let elapsedTime = currentTime - startTime;
				let progress = elapsedTime / duration;
				el.style.height = Math.max(startHeight - (progress * startHeight), 0) + 'px';

				if (progress < 1) {
					requestAnimationFrame(slideUp);
				} else {
					el.style.display = 'none';
					el.style.height = '';
					el.style.overflow = '';
				}
			}
			requestAnimationFrame(slideUp);
		}
	},

	slideUp: (element, duration = 300) => {
		let el = document.querySelector(element);
		let elHeight = el.offsetHeight;

		// Начало анимации
		let startTime = performance.now();

		function animate(currentTime) {
			let elapsedTime = currentTime - startTime;
			let progress = elapsedTime / duration;
			el.style.height = Math.max(elHeight - (progress * elHeight), 0) + 'px';

			if (progress < 1) {
				requestAnimationFrame(animate);
			} else {
				el.style.display = 'none';
				el.style.height = '';
				el.style.overflow = '';
			}
		}

		el.style.overflow = 'hidden';
		requestAnimationFrame(animate);
	}

};

export { config };

