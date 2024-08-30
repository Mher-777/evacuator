import { config } from "../config";

const button = {
    selector: ".js-btn",
    circle: ".b-circle",

    end(e) {
        const element = e.currentTarget;

        if (element.classList.contains("b-circle_pause")) {
            element.removeAttribute("style");
            element.classList.remove("js-start", "b-circle_pause");
        }
    },

    mouseenter(e) {
        if (window.innerWidth < 1024) return;

        const element = e.currentTarget;
        const circles = element.querySelectorAll(button.circle);

        if (Array.from(circles).some(circle => circle.classList.contains("js-dont-change"))) return;

        circles.forEach(circle => {
            const parent = circle.parentElement;
            const left = config.getRandomInt(
                -parent.offsetWidth / 2,
                parent.offsetWidth
            );
            const top = config.getRandomInt(
                -parent.offsetHeight / 2,
                parent.offsetHeight
            );

            circle.removeAttribute("style");
            circle.classList.remove("b-circle_pause");
            circle.style.marginLeft = `${left}px`;
            circle.style.marginTop = `${top}px`;
            circle.style.transform = "scale(13)";
            circle.classList.add("js-start");
        });
    },

    mouseleave(e) {
        if (window.innerWidth < 1024) return;

        const element = e.currentTarget;
        const circles = element.querySelectorAll(button.circle);

        if (!Array.from(circles).some(circle => circle.classList.contains("js-dont-change"))) {
            circles.forEach(circle => {
                circle.classList.add("b-circle_pause");
            });
        }
    },

    run(selector) {
        const circlesContainer = selector.querySelector(".js-circles");
        const count = circlesContainer.querySelectorAll(".b-circle").length;

        if (count === 0) {
            for (let i = 0; i < config.getRandomInt(2, 5); i++) {
                const left = config.getRandomInt(0, selector.offsetWidth);
                const top = config.getRandomInt(0, selector.offsetHeight);

                const circle = document.createElement("i");
                circle.classList.add("b-circle");
                circle.style.marginLeft = `${left}px`;
                circle.style.marginTop = `${top}px`;

                circlesContainer.appendChild(circle);
            }
        }

        selector.addEventListener("mouseenter", button.mouseenter);
        selector.addEventListener("mouseleave", button.mouseleave);
    },

    init() {
        const elements = document.querySelectorAll(button.selector);

        if (!elements.length) return;

        elements.forEach(el => {
            button.run(el);
        });

        document.querySelectorAll(button.circle).forEach(circle => {
            circle.addEventListener(config.transitionEnd, button.end);
        });
    }
};

export { button };