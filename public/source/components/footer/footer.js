import { storage } from "../../tools/store.js";
import { dispatchWindowSEvent } from "../../tools/utils.js";
import Component from "../global.js"

export default class Footer extends Component {
	constructor(name, shadowRoot) {
		super(name, shadowRoot);
		this.attachWindowSEvent('tasksUpdated', this.updateView);
		this.attachWindowSEvent('taskClicked', this.updateView);
		this.attachWindowSEvent('taskRemoved', this.updateView);
		this.updateView();
	}
	cleanTasks = () => {storage.clearCompletedTasks(); dispatchWindowSEvent('tasksCleaned'); this.shadowRoot.getElementById('box-footer').innerHTML = '-'}
	updateView = () => {
		const pendingTasksWatcher = storage.remainingTasks === 0 ? 'No task to do !' : `Remaining task(s) : ${storage.remainingTasks}`;
		this.shadowRoot.getElementById('box-title').innerHTML = /*HTML*/`<i class="fa fa-tasks" aria-hidden="true"></i> ${pendingTasksWatcher}`;
		const cleanerButton = storage.completedTasks === 0 ? `-` : /*HTML*/`- <span @click="cleanTasks" custom-event>Clear completed</span>`;
		this.shadowRoot.getElementById('box-footer').innerHTML = cleanerButton; this.eventsHandler();
	}
}
