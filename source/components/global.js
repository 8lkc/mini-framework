export default class Component {
    constructor(name, shadowRoot) {
        this.name = name;
        this.shadowRoot = shadowRoot;
        this.storage = {};
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
        const checklist = this.shadowRoot.getElementById('checklist');
        if(checklist) {
            console.log('Ok!');
            console.log(checklist);
            const tasks = JSON.parse(localStorage.getItem('tasks'));
            console.log(tasks);
            let counter = Number(checklist.getAttribute('counter'));
            console.log(counter);
            if(tasks.length > counter) {
                while(counter < tasks.length) {
                    const taskElement = document.createElement('input'); taskElement.type = 'checkbox'; taskElement.id = taskElement.value = tasks[counter].id;
                    const taskLabel = document.createElement('label'); taskLabel.setAttribute('for', tasks[counter].id); taskLabel.textContent = tasks[counter].label;
                    checklist.append(taskElement, taskLabel);
                    counter++;
                }
                checklist.getAttribute('counter');
            }
        } else {
            this.shadowRoot.querySelectorAll("[data-bind]").forEach((element) => {
                const property = element.getAttribute("data-bind"); element.textContent = this.model[property];
            });
        }
    }
}
