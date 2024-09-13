import { storage } from "../../tools/store.js";
import { dispatchWindowSEvent } from "../../tools/utils.js";
import Component from "../global.js"
export default class TaskCreatorComponent extends Component {
	constructor(name, shadowRoot) {super(name, shadowRoot)}
	addTask = () => {
		this.shadowRoot.getElementById('menu-toggle').classList.toggle('open');
		this.shadowRoot.getElementById('container').classList.toggle('expand');
	}
	getData = event => {
		if (event.key === 'Enter' || event.keyCode === 13) {
			const inputData = this.shadowRoot.getElementById('task-field'); storage.addTask(inputData.value); storage.broadcast();
			dispatchWindowSEvent('tasksUpdated'); inputData.value = '';
		}
	}
}
