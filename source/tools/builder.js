export const defineTag = tagName => {
    class CustomElement extends HTMLElement {
        constructor() {
            super();
            const shadowRoot = this.attachShadow({ mode: 'open' });

            shadowRoot.innerHTML = /*HTML*/`
                <div class="custom-element">
                    <h2>Hello from Shadow DOM!</h2>
                    <p>This is a custom element with shadow DOM.</p>
                </div>
            `;

            const style = document.createElement('style');
            style.textContent = /*CSS*/`
                .custom-element {
                    background-color: lightblue;
                    padding: 20px;
                    border-radius: 5px;
                }
                h2 {
                    color: navy;
                }
            `;
            shadowRoot.appendChild(style);

            const script = document.createElement('script');
            script.textContent = /*JS*/`
                console.log('Script executed inside shadow DOM.');
            `;
            shadowRoot.appendChild(script);
        }
    }

    customElements.define(tagName, CustomElement);
}
