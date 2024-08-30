import Swiper from 'swiper';
import { Navigation, Pagination, EffectFade, Autoplay, FreeMode, HashNavigation } from 'swiper/modules';

var sliders = {
    selector: ".js-slider",

    settings: {
        modules: [],
        loop: true,
        pagination: {
            clickable: true
        },
        autoplay: {
            delay: 5000,
        },
    },

    build: (element) => {
        let dataSettings = element.getAttribute("data-settings");
        let data = dataSettings ? JSON.parse(dataSettings) : {};
        let clone = JSON.parse(JSON.stringify(sliders.settings));

        let current = Object.assign(clone, data);
        current.modules.push(Navigation, Pagination, EffectFade, Autoplay, FreeMode, HashNavigation); // Добавляем модули

        if (element.swiper) {
            element.swiper.destroy(true, true); // Уничтожаем предыдущий экземпляр Swiper перед созданием нового
        }

        new Swiper(element, current);

        element.addEventListener('touchstart', (event) => event.preventDefault(), { passive: false });
    },

    run: (element) => {
        sliders.build(element);
    },

    init: () => {
        const sliderElements = document.querySelectorAll(sliders.selector);

        if (sliderElements.length === 0) return false;

        window.addEventListener("load", () => {
            sliderElements.forEach((el) => {
                sliders.run(el);
            });
        });

        let resizeTimeout;
        window.addEventListener('resize', () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                sliderElements.forEach((el) => {
                    sliders.run(el); // Повторный запуск слайдера при изменении размера
                });
            }, 100);
        });
    },
};

export { sliders };
