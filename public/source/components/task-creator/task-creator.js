import { storage } from "../../tools/store.js";
import { dispatchWindowSEvent } from "../../tools/utils.js";
import Component from "../global.js"
export default class TaskCreatorComponent extends Component {
	constructor(name, shadowRoot) {
		super(name, shadowRoot);
		this.attachWindowSEvent('tasksUpdated', this.updateView);
		this.attachWindowSEvent('taskClicked', this.updateView);
		this.attachWindowSEvent('tasksCleaned', this.updateView);
		this.attachWindowSEvent('taskRemoved', this.updateView);
		this.updateView();
	}
	toggleAll = () => {
		this.shadowRoot.querySelectorAll('.toggle-all-container')[0].classList.toggle('open');
		storage.toggleAll(); dispatchWindowSEvent('allTasksToggled');
	}
	getData = event => {
		if (event.key === 'Enter' || event.keyCode === 13) {
			const inputData = this.shadowRoot.getElementById('task-field'); storage.addTask(inputData.value); storage.broadcast();
			dispatchWindowSEvent('tasksUpdated'); inputData.value = '';
		}
	}
	updateView = () => {
		const toggleAllButton = this.shadowRoot.querySelectorAll('.toggle-all-container')[0];
		if(storage.taskCount === 0) toggleAllButton.style.display = 'none';
		else toggleAllButton.style.display = 'table';
	}
}
