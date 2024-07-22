async function fetchFile(path) {
    try {
        const response = await fetch(path); if (!response.ok) throw new Error(`Failed to fetch ${path}`);
        return await response.text();
    } catch (error) { console.error(`ERROR: loading file from ${path}:`, error); return ''; }
}

async function loadComponent(path) {
    try {
        const [component, commonCSS] = await Promise.all([fetchFile(path), fetchFile('./style.css')]);
        const tempDiv = document.createElement('div'); tempDiv.innerHTML = component;
        const cssContent = commonCSS + (tempDiv.querySelector('style')?.innerHTML.trim() || '');
        const htmlContent = tempDiv.querySelector('template')?.innerHTML.trim() || '';
        return { css: cssContent, html: htmlContent };
    } catch (error) { console.error('ERROR: loading component:', error); return { css: '', html: '' }; }
}

export async function buildComponent(name) {
    const content = await loadComponent(`./source/components/${name}/${name}.html`);
    class CustomElement extends HTMLElement {
        constructor() {
            super(); this.attachShadow({ mode: 'open' });
        }
        async connectedCallback() {
            this.shadowRoot.innerHTML = content.html;
            if (content.css) {
                const style = document.createElement('style'); style.textContent = content.css; this.shadowRoot.appendChild(style);
            }
            const module = await import(`./source/components/${name}/${name}.js`);
            const componentClass = module.default; this.componentInstance = new componentClass(name, this.shadowRoot);
        }
    }
    customElements.define(`${name}-component`, CustomElement);
}
