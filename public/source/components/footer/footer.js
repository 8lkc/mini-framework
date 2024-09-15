import { storage } from "../../tools/store.js";
import { dispatchWindowSEvent } from "../../tools/utils.js";
import Component from "../global.js"
export default class Footer extends Component {
	constructor(name, shadowRoot) {
		super(name, shadowRoot);
        this.attachWindowSEvent('tasksUpdated', this.updateView);
        this.attachWindowSEvent('taskRemoved', this.updateView);
        this.attachWindowSEvent('taskClicked', this.updateView);
        this.attachWindowSEvent('allTasksToggled', this.updateView);
        this.attachWindowSEvent('anchor', this.updateView);
		this.updateView();
	}
	cleanTasks = () => {storage.clearCompletedTasks(); dispatchWindowSEvent('tasksCleaned'); this.updateView()}
	updateView = event => {
		storage.update(); const footer = this.shadowRoot.querySelectorAll('.footer')[0];
		if(storage.taskCount > 0) footer.classList.remove('hidden'); else footer.classList.add('hidden');
		this.shadowRoot.querySelectorAll('.clear-completed')[0].innerHTML = storage.completedTasks > 0 ? 'Clear completed' : '';
		const activeTasksWatcher = storage.remainingTasks === 1 ? '<strong>1</strong> item left' : `<strong>${storage.remainingTasks}</strong> items left`;
		this.shadowRoot.querySelectorAll('.todo-count')[0].innerHTML = activeTasksWatcher;
        const items = this.shadowRoot.querySelectorAll('.filters')[0].children; let pathname;
		if(event && event.type === 'anchor') pathname = event.detail; else pathname = window.location.pathname.split('/').slice(1)[0];
		for(let i = 0; i < 3; i++) {
			if(items[i].children[0].classList.contains('selected')) items[i].children[0].classList.remove('selected');
			const itemSName = items[i].children[0].textContent; /* console.log(itemSName); */
			if(pathname === '' && itemSName === 'All') items[i].children[0].classList.add('selected');
			else if(pathname === 'active' && itemSName === 'Active') items[i].children[0].classList.add('selected');
			else if(pathname === 'completed' && itemSName === 'Completed') items[i].children[0].classList.add('selected');
		}
	}
	disconnectedCallback = () => {
		this.detachWindowSEvent('tasksUpdated', this.updateView);
        this.detachWindowSEvent('taskRemoved', this.updateView);
        this.detachWindowSEvent('taskClicked', this.updateView);
        this.detachWindowSEvent('allTasksToggled', this.updateView);
        this.detachWindowSEvent('anchor', this.updateView);
	}
}
