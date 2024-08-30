import JustValidate from "just-validate";
import Inputmask from "inputmask";
var forms = {
	mask: () => {
		var selector = document.querySelectorAll("input[name='phone']");

		var im = new Inputmask({
			mask: "+7 (999) 999-99-99",
			clearMaskOnLostFocus: true,
			clearIncomplete: false,
		});

		im.mask(selector);
	},

	validate: () => {
		document.querySelectorAll("form").forEach((form) => {
			const validator = new JustValidate(form, {
				errorLabelCssClass: 'input__error',
			});

			// Конфигурация полей и правил
			const validationConfig = {
				"input[name='phone']": [
					{
						rule: "required",
						errorMessage: "Это поле обязательно для заполнения",
					},
					{
						rule: "minLength",
						value: 10,
					},
				],

				"input[name='agreement']": [
					{
						rule: "required",
						errorMessage: false,
					},
				],

				"input[name='name']": [
					{
						rule: "required",
						errorMessage: "Это поле обязательно для заполнения",
					},
				],
				"input[name='ad_title']": [
					{
						rule: "required",
						errorMessage: "Это поле обязательно для заполнения",
					},
					{
						rule: "maxLength",
						value: 50,
						errorMessage: "Поле должно содержать максимум :value символов.",
					},
				],
				"textarea[name='ad_desc']": [
					{
						rule: "required",
						errorMessage: "Это поле обязательно для заполнения",
					},
					{
						rule: "maxLength",
						value: 50,
						errorMessage: "Поле должно содержать максимум :value символов.",
					},
				],
				"input[name='email']": [
					{
						rule: "required",
						errorMessage: "Это поле обязательно для заполнения",
					},
					{
						rule: "email",
						errorMessage: "Пожалуйста, введите действительный адрес электронной почты.",
					},
				],
			};

			// Автоматическое добавление полей на основе конфигурации
			for (const [selector, rules] of Object.entries(validationConfig)) {
				const field = form.querySelector(selector);
				if (field) {
					validator.addField(selector, rules);
				}
			}

			validator.onSuccess((event) => {
				form.submit()
			});
		});
	},

	events: () => {
		document.querySelectorAll(".input__field").forEach((input) => {
			input.addEventListener("focus", () => {
				input.parentElement.classList.add("is-focus");
			});

			input.addEventListener("blur", () => {
				if (input.value === "") {
					input.parentElement.classList.remove("is-focus");
				}
			});

			input.addEventListener("change", () => {
				if (input.value === "") {
					input.parentElement.classList.remove("is-focus");
				}
			});
		});
	},

	select: () => {
		function createCustomSelect(selectElement) {
			const selectWrapper = document.createElement('div');
			selectWrapper.className = 'custom-select is-close';

			const selectedOption = document.createElement('div');
			selectedOption.className = 'selected-option';
			selectedOption.textContent = selectElement.options[selectElement.selectedIndex].text;

			const optionsContainer = document.createElement('div');
			optionsContainer.className = 'options-container';

			Array.from(selectElement.options).forEach(option => {
				if (option.value) {
					const customOption = document.createElement('div');
					customOption.className = 'select-option';
					customOption.textContent = option.textContent;
					customOption.setAttribute('data-value', option.value);
					optionsContainer.appendChild(customOption);

					if (selectElement.value === option.value) {
						customOption.classList.add('is-active');
					}

					customOption.addEventListener('click', () => {
						selectedOption.textContent = customOption.textContent;
						selectElement.value = customOption.getAttribute('data-value');
						optionsContainer.style.display = 'none';
						selectWrapper.classList.remove('is-open');
						selectWrapper.classList.add('is-close');

						optionsContainer.querySelectorAll('.select-option').forEach(opt => {
							opt.classList.remove('is-active');
						});

						customOption.classList.add('is-active');
					});
				}
			});

			selectWrapper.appendChild(selectedOption);
			selectWrapper.appendChild(optionsContainer);
			selectElement.parentNode.insertBefore(selectWrapper, selectElement.nextSibling);
			selectElement.style.display = 'none'; // Скрытие стандартного селекта

			// Отображение и скрытие списка опций
			selectedOption.addEventListener('click', () => {
				const isOpen = optionsContainer.style.display === 'block';
				optionsContainer.style.display = isOpen ? 'none' : 'block';

				// Переключение классов is-open и is-close
				if (isOpen) {
					selectWrapper.classList.remove('is-open');
					selectWrapper.classList.add('is-close');
				} else {
					selectWrapper.classList.remove('is-close');
					selectWrapper.classList.add('is-open');
				}
			});

			// Закрытие селекта при клике вне его
			document.addEventListener('click', (event) => {
				if (!selectWrapper.contains(event.target)) {
					optionsContainer.style.display = 'none';
					selectWrapper.classList.remove('is-open');
					selectWrapper.classList.add('is-close');
				}
			});
		}

		document.querySelectorAll('.js-select').forEach(selectElement => {
			createCustomSelect(selectElement);
		});

	},

	init: () => {
		forms.mask();
		forms.select();
		forms.validate();
		forms.events();
	},
};

export { forms };
