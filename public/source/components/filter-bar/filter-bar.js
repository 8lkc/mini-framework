import Component from "../global.js"
export default class FilterBarComponent extends Component {
    constructor(name, shadowRoot) {
        super(name, shadowRoot);
        this.updateState();
    }
    updateState = () => {
        const windowSLocation = window.location.pathname.split('/').slice(1)[0];
        const location = windowSLocation === '' ? 'all' : windowSLocation;
        this.shadowRoot.getElementById(location).setAttribute('checked', '');
    }
}
