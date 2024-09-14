import { storage } from "../../tools/store.js";
import { dispatchWindowSEvent } from "../../tools/utils.js";
import Component from "../global.js"
export default class ChecklistComponent extends Component {
	constructor(name, shadowRoot) {
		super(name, shadowRoot);
		this.clickTimeout;
		this.attachWindowSEvent('tasksUpdated', this.updateView);
		this.attachWindowSEvent('anchor', this.filterTasks);
		this.attachWindowSEvent('taskClicked', this.filterTasks);
		this.attachWindowSEvent('taskClicked', this.updateView);
		this.attachWindowSEvent('tasksCleaned', this.filterTasks);
		this.attachWindowSEvent('tasksCleaned', this.updateView);
		this.attachWindowSEvent('taskRemoved', this.updateView);
		this.attachWindowSEvent('allTasksToggled', this.updateView);
		this.updateView();
	}
	filterTasks = () => {this.shadowRoot.querySelectorAll('.todo-list')[0].innerHTML = ''; storage.tasks.forEach(task => this.renderTask(task))}
	editTask = event => {
		if (this.clickTimeout) clearTimeout(this.clickTimeout); // Cancel single click if double-click is detected
        const label = event.target; const taskId = Number(label.getAttribute('for'));
        const input = this.makeHTMLElement('input'); input.type = 'text'; input.value = label.textContent; input.classList.add('edit-input');
        label.replaceWith(input); input.focus();
        const saveUpdatedTask = () => {
			const updatedLabel = input.value;
			if (updatedLabel.trim()) {label.textContent = updatedLabel; storage.updateTaskLabel(taskId, updatedLabel)}
			input.replaceWith(label);
		};
		// Add event listeners
		input.addEventListener('blur', saveUpdatedTask);
		input.addEventListener('keydown', (e) => {if (e.key === 'Enter') saveUpdatedTask();});
	}
	removeTask = event => {
		const layout = this.shadowRoot.querySelectorAll('.todo-list')[0];
		const button = event.target.parentElement.parentElement;
		const id = button.id.split(':')[1];
		const input = this.shadowRoot.getElementById(id);
		if(button) layout.removeChild(button);
		this.shadowRoot.querySelectorAll('[for]').forEach(node => {if(node.getAttribute('for') === id) layout.removeChild(node)});
		if(input) layout.removeChild(input);
		storage.removeTask(Number(id));
		dispatchWindowSEvent('taskRemoved');
	}
	renderTask = task => {
		const pathname = window.location.pathname.split('/').slice(1)[0];
		if(pathname === '' || pathname === 'active' && !task.completed || pathname === 'completed' && task.completed) {
			const checklist = this.shadowRoot.querySelectorAll('.todo-list')[0]; const temp = checklist.innerHTML;
			checklist.innerHTML = /*HTML*/`${temp}<input class="toggle" type="checkbox" value="0" id="${task.id}"></input>
										   <label class="view" for="${task.id}" @click="toggleState" @dblclick="editTask" custom-event>${task.label}</label>`;
			const taskElement = this.shadowRoot.getElementById(task.id);
			if(task.completed) taskElement.setAttribute('checked', '');
			const deleteButton = this.makeHTMLElement('div'); deleteButton.id = 'db:' +task.id; deleteButton.className = 'destroy';
			deleteButton.innerHTML = /*HTML*/`<div class="inner"><span @click="removeTask" custom-event>delete</span></div>`;
			checklist.append(deleteButton); this.eventsHandler();
		}
	}
	toggleState = event => {
		if (this.clickTimeout) clearTimeout(this.clickTimeout);
		this.clickTimeout = setTimeout(() => {
			storage.toggleState(Number(event.originalTarget.getAttribute('for'))); 
			dispatchWindowSEvent('taskClicked')
		}, 200);
	}
	updateView = (event) => {
		const todoList = this.shadowRoot.querySelectorAll('.todo-list')[0];
		if(storage.taskCount === 0) {todoList.style.display = 'none'; return}
		todoList.style.display = 'grid';
		if(!event) {storage.update(); storage.tasks.forEach(task => this.renderTask(task)); return}
		switch(event.type) {
			case 'tasksUpdated': this.renderTask(storage.getTaskAtPosition(storage.taskCount - 1)); break;
			// default: console.error('UNKNOWN EVENT TYPE: ', event.type);
		}
	}
	disconnectedCallback = () => {
		this.detachWindowSEvent('tasksUpdated', this.updateView);
		this.detachWindowSEvent('anchor', this.updateView);
	}
}
