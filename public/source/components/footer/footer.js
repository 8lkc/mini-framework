import { storage } from "../../tools/store.js";
import { dispatchWindowSEvent } from "../../tools/utils.js";
import Component from "../global.js"

export default class Footer extends Component {
	constructor(name, shadowRoot) {
		super(name, shadowRoot);
		this.attachWindowSEvent('tasksUpdated', this.updateView);
		this.attachWindowSEvent('taskClicked', this.updateView);
		this.attachWindowSEvent('taskRemoved', this.updateView);
		this.attachWindowSEvent('tasksCleaned', this.updateView);
		this.updateView();
	}
	cleanTasks = () => {storage.clearCompletedTasks(); dispatchWindowSEvent('tasksCleaned')}
	updateView = () => {
        storage.update();
		const activeTasksWatcher = storage.taskCount === 0 ? '' : `Remaining task(s) : ${storage.remainingTasks}`;
		this.shadowRoot.querySelectorAll('.todo-count')[0].innerHTML = /*HTML*/`<i class="fa fa-tasks" aria-hidden="true"></i> ${activeTasksWatcher}`;
		const cleanerButton = storage.completedTasks === 0 ? `-` : /*HTML*/`- <span @click="cleanTasks" custom-event>Clear completed</span>`;
		this.shadowRoot.querySelectorAll('.clear-completed')[0].innerHTML = cleanerButton; this.eventsHandler();
	}
}
