import { storage } from "../../tools/store.js";
import Component from "../global.js"
export default class ChecklistComponent extends Component {
	constructor(name, shadowRoot) {
		super(name, shadowRoot);
		this.attachWindowSEvent('tasksUpdated', this.updateView);
		this.attachWindowSEvent('anchor', this.updateView);
		this.updateView();
	}
	removeTask = event => {
		const layout = this.shadowRoot.getElementById('list');
		const button = event.target.parentElement.parentElement;
		const id = button.id.split(':')[1];
		const input = this.shadowRoot.getElementById(id);
		if(button) layout.removeChild(button);
		this.shadowRoot.querySelectorAll('[for]').forEach(node => {if(node.getAttribute('for') === id) layout.removeChild(node)});
		if(input) layout.removeChild(input);
		storage.removeTask(Number(id));
	}
	renderTask = task => {
		const taskElement = this.makeHTMLElement('input'); taskElement.type = 'checkbox'; taskElement.id = taskElement.value = task.id;
		if(task.completed) taskElement.checked = true;
		const taskLabel = this.makeHTMLElement('label'); taskLabel.setAttribute('for', task.id); taskLabel.textContent = task.label;
		const deleteButton = this.makeHTMLElement('div'); deleteButton.id = 'db:' +task.id; deleteButton.className = 'outer';
		deleteButton.innerHTML = /*HTML*/`<div class="inner"><span @click="removeTask" custom-event>delete</span></div>`;
		this.shadowRoot.getElementById('list').append(taskElement, taskLabel, deleteButton);
		this.eventsHandler();
	}
	updateView = (event) => {
		if(!event) {storage.update(); storage.tasks.forEach(task => this.renderTask(task)); return}
		switch(event.type) {
			case 'anchor':
				this.shadowRoot.getElementById('list').innerHTML = ''; // Clear existing task
				storage.filter(event.detail).forEach(task => this.renderTask(task)); break;
			case 'tasksUpdated': this.renderTask(storage.getTaskAtPosition(storage.taskCount - 1)); break;
			default: console.error('UNKNOWN EVENT TYPE: ', event.type);
		}
	}
	disconnectedCallback = () => {
		this.detachWindowSEvent('tasksUpdated', this.updateView);
		this.detachWindowSEvent('anchor', this.updateView);
	}
}
