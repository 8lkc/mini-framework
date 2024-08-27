import App from "../tools/utils.js";
export default class Component extends App {
    constructor(name, shadowRoot) {
        super(); this.name = name; this.shadowRoot = shadowRoot;
        this.eventsHandler();
    }
    eventsHandler = () => {
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
    anchor = event => {
        const destination = event.target.getAttribute('destination');
        const aEvent = new CustomEvent('anchor', {detail: destination}); window.dispatchEvent(aEvent);
    }
}
