import { router } from "../router.js";
import App, { dispatchWindowSEvent } from "../tools/utils.js";
export default class Component extends App {
    constructor(name, shadowRoot) {
        super(); this.name = name; this.shadowRoot = shadowRoot;
        this.attachedElements = new WeakMap();  // Track elements that have listeners attached
        this.eventsHandler();
    }
    anchor = event => {
        const destination = event.target.getAttribute('destination');
        dispatchWindowSEvent('anchor', destination); router.loadRoute(destination);
    }
    eventsHandler = () => {
        this.shadowRoot.querySelectorAll('[custom-event]').forEach((element) => {
            Array.from(element.attributes).forEach((attribute) => {
                if (attribute.name.startsWith("@")) {
                    const eventParts = attribute.value.split("=");
                    const event = attribute.name.trim().substring(1);
                    const handler = eventParts[0].trim();
                    // Check if the element already has this event attached
                    if (!this.attachedElements.has(element)) {
                        // Attach the event listeevents being called multiple timesner
                        element.addEventListener(event, (e) => this[handler](e));
                        // Store the element in the WeakMap to prevent future duplicates
                        this.attachedElements.set(element, true);
                    }
                }
            });
        });
    }
}
