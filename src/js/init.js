import { defaults } from "./modules/defaults";
import { forms } from "./modules/forms";
import { button } from "./modules/button";
import { sliders } from "./modules/slider";
import { menu } from "./modules/menu";
import { tabs } from "./modules/tabs";
import { config } from "./config";

var App = () => {

	defaults.init();
	forms.init();
	button.init();
	sliders.init();
	menu.init();
	tabs.init();

	config.log('app init')
	
};

export { App };