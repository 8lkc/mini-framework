export { buildComponent };

async function fetchFile(path) {
    try {
        const response = await fetch(path); if (!response.ok) throw new Error(`Failed to fetch ${path}`); return await response.text();
    } catch (error) {console.error(`ERROR: loading file from ${path}:`, error); return '';}
}

async function loadComponent(path) {
    try {
        const [component, commonJS, commonCSS] = await Promise.all([fetchFile(path), fetchFile('./source/components/global.js'), fetchFile('./style.css')]);
        const tempDiv = document.createElement('div'); tempDiv.innerHTML = component;
        const jsContent = (tempDiv.querySelector('script')?.innerHTML.trim() || '') + commonJS;
        const cssContent = (tempDiv.querySelector('style')?.innerHTML.trim() || '') + commonCSS;
        const htmlContent = tempDiv.querySelector('template')?.innerHTML.trim() || '';
        return { js: jsContent, css: cssContent, html: htmlContent };
    } catch (error) {console.error('ERROR: loading component:', error); return { js: '', css: '', html: '' };}
}

async function buildComponent(name) {
    const content = await loadComponent(`./source/components/${name}.html`);
    class CustomElement extends HTMLElement {
        constructor() {
            super();
            const shadowRoot = this.attachShadow({ mode: 'open' }); shadowRoot.innerHTML = content.html;
            if (content.css) {const style = document.createElement('style'); style.textContent = content.css; shadowRoot.appendChild(style);}
            if (content.js) {const script = document.createElement('script'); script.textContent = content.js; shadowRoot.appendChild(script);}
        }
    }
    customElements.define(`${name}-component`, CustomElement);
}
