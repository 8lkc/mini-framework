import { tasks } from "../../tools/store.js";
import Component from "../global.js"

export default class ChecklistComponent extends Component {
	constructor(name, shadowRoot) {
		super(name, shadowRoot);
		// this.renderTasks();
	}

	// renderTasks() {
	// 	if(tasks.length > 0) {
	// 		tasks.forEach(task => {
	// 			const taskElement = document.createElement('input'); taskElement.type = 'checkbox'; taskElement.id = taskElement.value = task.id;
	// 			const taskLabel = document.createElement('label'); taskLabel.setAttribute('for', task.id); taskLabel.textContent = task.label;
	// 			this.shadowRoot.getElementById('list').append(taskElement, taskLabel);
	// 		});
	// 	}
	// }
}
