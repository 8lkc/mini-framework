export default class Component {
    constructor(name, shadowRoot, model) {
        this.name = name;
        this.shadowRoot = shadowRoot;
        this.model = model;
        this.updateTemplate();
        this.eventsHandler();
    }

    eventsHandler() {
        this.shadowRoot.querySelectorAll('[custom-event]').forEach((element) => {
            Array.from(element.attributes).forEach((attribute) => {
                if (attribute.name.startsWith("@")) {
                    const eventParts = attribute.value.split("=");
                    const event = attribute.name.trim().substring(1);
                    const handler = eventParts[0].trim();
                    element.addEventListener(event, (event) => this[handler](event));
                }
            });
        });
    }

    updateTemplate() {
        this.shadowRoot.querySelectorAll("[data-bind]").forEach((element) => {
            const property = element.getAttribute("data-bind"); element.textContent = this.model[property];
        });
    }
}
