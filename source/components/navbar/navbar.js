import Component from "../global.js"

export default class NavbarComponent extends Component {
    constructor(name, shadowRoot) {
        const model = {
            counter: 0
        };
        super(name, shadowRoot, model);
    }

    increase() {
        this.model.counter++;
        this.updateTemplate();
    }
}
