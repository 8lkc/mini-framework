import Component from "../global.js"

export default class NavbarComponent extends Component {
	constructor(name, shadowRoot) {
		super(name, shadowRoot);
	}

	addTask() {
		this.shadowRoot.getElementById('menu-toggle').classList.toggle('open');
	}
}
