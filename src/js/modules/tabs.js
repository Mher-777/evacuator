const tabs = {
    tabLinks: document.querySelectorAll('.js-tab'),
    tabContents: document.querySelectorAll('.js-tab-content'),

    fadeIn: (element, duration = 300) => {
        if (!element) return;
        let opacity = 0;
        const interval = 50;
        const gap = interval / duration;

        element.style.display = 'block';
        element.style.opacity = opacity;

        const fade = () => {
            opacity += gap;
            if (opacity >= 1) {
                opacity = 1;
                clearInterval(fading);
            }
            element.style.opacity = opacity;
        };

        const fading = setInterval(fade, interval);
    },

    fadeOut: (element, duration = 300, callback) => {
        if (!element) return;
        let opacity = 1;
        const interval = 50;
        const gap = interval / duration;

        const fade = () => {
            opacity -= gap;
            if (opacity <= 0) {
                opacity = 0;
                element.style.display = 'none';
                clearInterval(fading);
                if (callback) callback(); // вызываем коллбек после завершения fadeOut
            }
            element.style.opacity = opacity;
        };

        const fading = setInterval(fade, interval);
    },

    init: () => {
        tabs.tabLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetTab = this.getAttribute('data-tab');
                const targetContent = document.getElementById(targetTab);

                tabs.tabLinks.forEach(function(link) {
                    link.classList.remove('is-active');
                });

                tabs.tabContents.forEach(function(content) {
                    if (content !== targetContent) {
                        tabs.fadeOut(content);
                    }
                });

                this.classList.add('is-active');
                // Выполняем fadeIn только после завершения fadeOut
                tabs.fadeOut(document.querySelector('.js-tab-content:is(:not(#' + targetTab + '))'), 300, () => {
                    tabs.fadeIn(targetContent, 300);
                });
            });
        });

        const firstTab = tabs.tabLinks[0];
        const firstContent = tabs.tabContents[0];

        if (firstTab && firstContent) {
            firstTab.classList.add('is-active');
            firstContent.style.display = 'block';
            firstContent.style.opacity = 1;
        }
    }
};

export { tabs };
