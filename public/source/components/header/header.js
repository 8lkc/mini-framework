import { storage } from "../../tools/store.js";
import { dispatchWindowSEvent } from "../../tools/utils.js";
import Component from "../global.js"
export default class Header extends Component {
	constructor(name, shadowRoot) {
		super(name, shadowRoot);
	}
	getData = event => {
		if (event.key === 'Enter' || event.keyCode === 13) {
			const inputData = event.target; storage.addTask(inputData.value); storage.broadcast();
			dispatchWindowSEvent('tasksUpdated'); inputData.value = '';
		}
	}
}
