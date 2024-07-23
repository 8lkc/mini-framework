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
            Array.from(element.attributes).forEach((attribute) => {
                if (attribute.name.startsWith("@")) {
                    const eventHandler = attribute.value.split("=");
                    const event = attribute.name.trim().substring(1);
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
