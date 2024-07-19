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
        const jsContent = commonJS + (tempDiv.querySelector('script')?.innerHTML.trim() || '');
        const cssContent = commonCSS + (tempDiv.querySelector('style')?.innerHTML.trim() || '');
        const htmlContent = tempDiv.querySelector('template')?.innerHTML.trim() || '';
        return { js: jsContent, css: cssContent, html: htmlContent };
    } catch (error) {console.error('ERROR: loading component:', error); return { js: '', css: '', html: '' };}
}

async function buildComponent(name) {
    const content = await loadComponent(`./source/components/${name}.html`);
    class CustomElement extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
        }
    
        async connectedCallback() {
            this.shadowRoot.innerHTML = content.html;
            if (content.css) {
                const style = document.createElement('style');
                style.textContent = content.css;
                this.shadowRoot.appendChild(style);
            }
    
            // Directly include JavaScript logic in this method
            let counter = 0;
            const btn = this.shadowRoot.getElementById('checker');
            if (btn) {
                btn.addEventListener('click', () => {
                    counter++;
                    btn.textContent = `Click => ${counter}`;
                });
            }
        }
    }
    customElements.define(`${name}-component`, CustomElement);
}
