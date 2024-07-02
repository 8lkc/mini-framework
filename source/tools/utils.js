export { defineTag };

async function loadComponent(path) {
    try {
        const response = await fetch(path);
        const text = await response.text();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;

        const scss = tempDiv.querySelector('style').innerHTML.trim();

        return {
            js: tempDiv.querySelector('script').innerHTML.trim(),
            html: tempDiv.querySelector('template').innerHTML.trim(),
            css: await compileSCSS(scss)
        };
    } catch (error) {
        console.error('ERROR: loading component:', error);
    }
}

function loadSassLibrary() {
    return new Promise((resolve, reject) => {
        if (typeof Sass !== 'undefined') {
            resolve();
        } else {
            const sassScript = document.createElement('script');
            sassScript.src = 'https://cdn.jsdelivr.net/npm/sass.js@0.11.1/dist/sass.sync.js';
            sassScript.onload = () => resolve();
            sassScript.onerror = () => reject('Failed to load Sass.js');
            document.head.appendChild(sassScript);
        }
    });
}

async function compileSCSS(scss) {
    await loadSassLibrary();
    return new Promise((resolve, reject) => {
        Sass.compile(scss, result => {
            if (result.status === 0) {
                resolve(result.text);
            } else {
                reject(result.message);
            }
        });
    });
}

async function defineTag(component) {
    const content = await loadComponent(`./source/components/${component}.html`);
    if (!content) {
        return;
    }
    class CustomElement extends HTMLElement {
        constructor() {
            super();
            const shadowRoot = this.attachShadow({ mode: 'open' });
            shadowRoot.innerHTML = content.html;

            const style = document.createElement('style');
            style.textContent = content.css;
            shadowRoot.appendChild(style);

            const script = document.createElement('script');
            script.textContent = content.js;
            shadowRoot.appendChild(script);
        }
    }
    customElements.define(`${component}-component`, CustomElement);
}
