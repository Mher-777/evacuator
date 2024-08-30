import { config } from "../config";

const menu = {
    resizeTimer: '',
    OldScrollPosition: 0,

    scrollState: () => {
        const header = document.querySelector('.header');

        const ScrollDown = menu.OldScrollPosition < window.scrollY;

        menu.OldScrollPosition = window.scrollY;

        const HEADER_TOP_HEIGHT = header.offsetHeight;

        if (window.scrollY > HEADER_TOP_HEIGHT) {

            const style = {
                'marginTop': `${-HEADER_TOP_HEIGHT - 40}px`,
            };

            if (!ScrollDown) {
                style['marginTop'] = '0';
            }
            setTimeout(function () {
                header.classList.add('is-sticky');
                Object.assign(header.style, style);
            }, 100);

        } else {

            if (!ScrollDown) {
                setTimeout(function () {
                    header.style.marginTop = '0';
                    header.classList.remove('is-sticky');
                }, 100);
            } else {
                setTimeout(function () {
                    header.removeAttribute('style');
                    header.classList.remove('is-sticky');
                }, 100);
            }
        }
    },

    menuHamburger: () => {
        const hamburger = document.querySelector('.hamburger');
        if (window.innerWidth > 580) {
            hamburger.classList.remove('is-active');
            config.slideUp('.header__menu')
        } else {
            // Проверяем, добавлен ли уже обработчик
            if (!hamburger.classList.contains('js-click-handler')) {
                hamburger.classList.add('js-click-handler');
                hamburger.addEventListener('click', function () {
                    this.classList.toggle('is-active');
                    config.slideToggle('.header__menu')
                });
            }
        }
    },

    init: () => {
        config.addListenerMulti(window, 'scroll load', config.debounce(function () {
            menu.scrollState();
        }, 10));

        config.addListenerMulti(window, 'resize load', config.debounce(function () {
            menu.menuHamburger();
        }, 200));
    }
}

export { menu };