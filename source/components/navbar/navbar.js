import Component from "../global.js"

export default class NavbarComponent extends Component {
    constructor(name, shadowRoot) {
        super(name, shadowRoot);

        this.counter = 0;
    }

    increase() {
        const button = this.shadowRoot.querySelector("#checker")
        button.textContent = `Click => ${this.counter++}`;
    }
}
