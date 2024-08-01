import { tasks } from "../../tools/store.js";
import Component from "../global.js"

export default class NavbarComponent extends Component {
	constructor(name, shadowRoot) {
		super(name, shadowRoot);
	}

	addTask() {
		this.shadowRoot.getElementById('menu-toggle').classList.toggle('open');
		this.shadowRoot.getElementById('container').classList.toggle('expand');
	}

	getData(event) {
		if (event.key === 'Enter' || event.keyCode === 13) {
			const inputData = this.shadowRoot.getElementById('task-field');
			tasks.push({
				id: tasks.length,
				label: inputData.value,
				completed: false,
			});
			inputData.value = '';
			console.log(tasks);
		}
	}
}
