export { defineTag };

async function loadComponent(path) {
    try {
        const responses = {
            component: await fetch(path),
            commonJS: await fetch('./source/components/global.js'),
            commonCSS: await fetch('./style.css')
        };
        const component = await responses.component.text();
        const commonJS = await responses.commonJS.text();
        const commonCSS = await responses.commonCSS.text();
        const tempDiv = document.createElement('div'); tempDiv.innerHTML = component;
        return {
            js: tempDiv.querySelector('script').innerHTML.trim() + commonJS,
            css: tempDiv.querySelector('style').innerHTML.trim() + commonCSS,
            html: tempDiv.querySelector('template').innerHTML.trim()
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
