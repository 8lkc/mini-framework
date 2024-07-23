#!/usr/bin/env node
import fs from "fs";
import path from "path";

function createComponent(name) {
    const dirPath = path.join(process.cwd(), "source/components", name);
    const files = [
        {
            name: `${name}.html`,
            content: /*html*/`
                <template>
                    <div>${name} works !</div>
                </template>

                <style>
                    button {
                        /* padding: 1rem 2rem; */
                    }
                </style>
            `,
        },
        {
            name: `${name}.js`,
            content: /*js*/`
                import Component from "../global.js"\n
                export default class NavbarComponent extends Component {
                    constructor(name, shadowRoot) {
                        const model = {};
                        super(name, shadowRoot, model);
                    }
                }
            `,
        },
    ];

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    files.forEach((file) => {
        fs.writeFileSync(path.join(dirPath, file.name), file.content);
    });

    console.log(`Component ${name} has been created.`);
}

const name = process.argv[2];
if (!name) {
  console.error("Please specify the component name");
  process.exit(1);
}
createComponent(name);
