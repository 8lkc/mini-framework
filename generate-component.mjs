#!/usr/bin/env node
import fs from "fs";
import path from "path";

function createComponent(name) {
    const dirPath = path.join(process.cwd(), "source/components", name);
    const files = [
        {
            name: `${name}.html`,
            content: /*html*/`<template>\n\t<h1>${name} works !</h1>\n</template>\n\n<style>\n\t/* padding: 1rem 2rem; */\n</style>\n`,
        },
        {
            name: `${name}.js`,
            content: /*js*/`import Component from "../global.js"\n\nexport default class NavbarComponent extends Component {\n\tconstructor(name, shadowRoot, model) {\n\t\tconst model = {};\n\t\tsuper(name, shadowRoot, model);\n\t}\n}\n`,
        },
    ];
    if (!fs.existsSync(dirPath)) {fs.mkdirSync(dirPath, { recursive: true });}
    files.forEach((file) => {fs.writeFileSync(path.join(dirPath, file.name), file.content);});
    console.log(`Component ${name} has been created.`);
}

const name = process.argv[2];
if (!name) {console.error("Please specify the component name"); process.exit(1);}
createComponent(name);
