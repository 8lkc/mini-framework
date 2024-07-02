export { defineTag };

async function loadComponent(path) {
    try {
        const response = await fetch(path);
        const text = await response.text();
        const tempDiv = document.createElement('div'); tempDiv.innerHTML = text;
        return {
            js: tempDiv.querySelector('script').innerHTML.trim(),
            html: tempDiv.querySelector('template').innerHTML.trim(),
            css: tempDiv.querySelector('style').innerHTML.trim()
        }
    } catch(error) {
        console.error('ERROR: loading component:', error);
    }
}

async function defineTag(component) {
    const content = await loadComponent(`./source/components/${component}.html`);
    class CustomElement extends HTMLElement {
        constructor() {
            super();
            const shadowRoot = this.attachShadow({ mode: 'open' }); shadowRoot.innerHTML = content.html;
            const style = document.createElement('style'); style.textContent = content.css; shadowRoot.appendChild(style);
            const script = document.createElement('script'); script.textContent = content.js; shadowRoot.appendChild(script);
        }
    }
    customElements.define(component +'-component', CustomElement);
}
