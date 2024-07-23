export default class Component {
    constructor(name, shadowRoot) {
        this.name = name;
        this.shadowRoot = shadowRoot;

        this.eventHandler();
    }

    eventHandler() {
        const events = this.shadowRoot.querySelectorAll('[custom-event]');
        events.forEach((element) => {
            const attributes = Array.from(element.attributes);
            attributes.forEach((attr) => {
                if (attr.name.startsWith("@")) {
                    const eventHandler = attr.value.split("=");
                    const event = attr.name.trim().substring(1);
                    const handler = eventHandler[0].trim();
                    element.addEventListener(event, (event) => this[handler](event));
                }
            });
        });
    }
}
