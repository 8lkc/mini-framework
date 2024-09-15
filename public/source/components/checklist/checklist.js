import { storage } from "../../tools/store.js";
import { dispatchWindowSEvent } from "../../tools/utils.js";
import Component from "../global.js"
export default class Checklist extends Component {
	constructor(name, shadowRoot) {
		super(name, shadowRoot);
        this.attachWindowSEvent('tasksUpdated', this.updateView);
        this.attachWindowSEvent('taskClicked', this.updateView);
        this.attachWindowSEvent('taskRemoved', this.updateView);
        this.attachWindowSEvent('tasksCleaned', this.updateView);
		this.updateView();
	}
	editTask = event => {
		const item = event.target.parentNode.parentNode; item.classList.add('editing');
		const label = event.target; const taskId = Number(item.getAttribute('data-id'));
		const input = this.makeHTMLElement('input'); input.type = 'text'; input.value = label.textContent; input.classList.add('edit');
		item.appendChild(input); input.focus();
        const saveUpdatedTask = () => {
			const updatedLabel = input.value;
			if (updatedLabel.trim()) {
				label.textContent = updatedLabel; storage.updateTaskLabel(taskId, updatedLabel); item.removeChild(input); item.classList.remove('editing');
			}
		};
		// Add event listeners
		input.addEventListener('blur', saveUpdatedTask);
		input.addEventListener('keydown', (e) => {if (e.key === 'Enter') saveUpdatedTask();})
	}
	removeTask = event => {
		const item = event.target.parentNode.parentNode; storage.removeTask(Number(item.getAttribute('data-id')));
		this.shadowRoot.querySelectorAll('.todo-list')[0].removeChild(item); dispatchWindowSEvent('taskRemoved');
	}
	render = task => {
		const pathname = window.location.pathname.split('/').slice(1)[0];
		if(pathname === '' || pathname === 'active' && !task.completed || pathname === 'completed' && task.completed) {
			const checklist = this.shadowRoot.querySelectorAll('.todo-list')[0];
			const item = this.makeHTMLElement('li'); item.setAttribute('data-id', task.id);
			item.innerHTML = /*HTML*/`
				<div class="view">
					<input class="toggle" type="checkbox" @click="toggleState" custom-event>
					<label @dblclick="editTask" custom-event>${task.label}</label>
					<button class="destroy" @click="removeTask" custom-event></button>
				</div>
			`; checklist.appendChild(item);
			const checkbox = item.children[0].children[0];
			if(task.completed) {item.classList.add('completed'); checkbox.setAttribute('checked', '')}
			this.eventsHandler();
		}
	}
	renderAll = () => {this.shadowRoot.querySelectorAll('.todo-list')[0].innerHTML = ''; storage.tasks.forEach(task => this.render(task))}
	toggleAll = event => {
		const checkbox = this.shadowRoot.querySelectorAll('.toggle-all')[0];
		if (checkbox.hasAttribute('checked')) {storage.toggleAll('undo'); checkbox.removeAttribute('checked')}
		else {storage.toggleAll(); checkbox.setAttribute('checked', '')}
		dispatchWindowSEvent('allTasksToggled'); this.updateView();
	}
	toggleState = event => {
		storage.toggleState(Number(event.target.parentNode.parentNode.getAttribute('data-id')));
		dispatchWindowSEvent('taskClicked');
	}
	updateView = event => {
		storage.update(); const todoList = this.shadowRoot.querySelectorAll('.main')[0];
		if(storage.taskCount === 0) {todoList.classList.add('hidden'); return} todoList.classList.remove('hidden');
		const checkbox = this.shadowRoot.querySelectorAll('.toggle-all')[0];
		if(storage.filter('active').length === 0) checkbox.setAttribute('checked', ''); else checkbox.removeAttribute('checked');
		if(!event || event.type === 'taskRemoved' || event.type === 'taskClicked' || event.type === 'tasksCleaned') {this.renderAll(); return}
		switch(event.type) {
			case 'tasksUpdated': this.render(storage.getTaskAtPosition(storage.taskCount - 1)); break;
			default: console.error('UNKNOWN EVENT TYPE: ', event.type);
		}
	}
	disconnectedCallback = () => {
		this.detachWindowSEvent('tasksUpdated', this.updateView);
        this.detachWindowSEvent('taskClicked', this.updateView);
        this.detachWindowSEvent('taskRemoved', this.updateView);
        this.detachWindowSEvent('tasksCleaned', this.updateView);
	}
}
