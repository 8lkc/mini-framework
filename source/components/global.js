export default class Component {
    constructor(name, shadowRoot, model) {
        this.name = name;
        this.shadowRoot = shadowRoot;
        this.model = model;

        this.eventHandler();
        this.updateTemplate();
    }

    eventHandler() {
        this.shadowRoot.querySelectorAll('[custom-event]').forEach((element) => {
            Array.from(element.attributes).forEach((attr) => {
                if (attr.name.startsWith("@")) {
                    const eventHandler = attr.value.split("=");
                    const event = attr.name.trim().substring(1);
                    const handler = eventHandler[0].trim();
                    element.addEventListener(event, (event) => this[handler](event));
                }
            });
        });
    }

    updateTemplate() {
        this.shadowRoot.querySelectorAll("[data-bind]").forEach((element) => {
            const prop = element.getAttribute("data-bind");
            element.textContent = this.model[prop];
        });
    }
}
