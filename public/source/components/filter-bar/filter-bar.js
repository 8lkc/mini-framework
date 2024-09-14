import { storage } from "../../tools/store.js";
import Component from "../global.js"
export default class FilterBarComponent extends Component {
    constructor(name, shadowRoot) {
        super(name, shadowRoot);
		this.attachWindowSEvent('tasksUpdated', this.updateView);
		this.attachWindowSEvent('taskClicked', this.updateView);
		this.attachWindowSEvent('tasksCleaned', this.updateView);
		this.attachWindowSEvent('taskRemoved', this.updateView);
        this.updateState();
    }
    updateState = () => {
        this.updateView();
        const windowSLocation = window.location.pathname.split('/').slice(1)[0];
        const location = windowSLocation === '' ? 'all' : windowSLocation;
        this.shadowRoot.getElementById(location).setAttribute('checked', '');
    }
    updateView = () => {
        const filterBar = this.shadowRoot.querySelectorAll('.filters')[0];
		if(storage.taskCount === 0) {filterBar.style.display = 'none'; return}
		filterBar.style.display = 'flex';
    }
}
