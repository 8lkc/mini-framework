# MINI-FRAMEWORK DOCUMENTATION

* Introduction
Mini-framework is a project aimed at creating our own framework which will implement three features: DOM abstraction, routing system and state management.This document provides a detailed explanation of how to use our framework

## Features
DOM Abstraction
The mini-framework provides tools to simplify DOM manipulation, enabling dynamic creation and management of HTML elements with reduced complexity.

Element Creation
The framework offers a simple syntax for creating HTML elements:
const myElement = makeHTMLElement('div');
myElement.textContent = 'Hello, World!';

## Getting started
1.Install the framework
set up the environment by importing the tools directory and the compenents directory too, and ensure that the global.js file in the components directory contains at least the following code:

```
import App from "../tools/utils.js";
export default class Component extends App {
    constructor(name, shadowRoot) {
        super(); this.name = name; this.shadowRoot = shadowRoot;
        this.eventsHandler();
    }
    eventsHandler = () => {
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
}
```

## Event Handling
define a keyword in the relevant html element, then assign it a method to be defined in the relevant component class

Code exemple :
HTML
```
<button @click="getData" custom-event>Click me !</button>
```

Javascript
```
getData = () => {
    console.log("Here is you data")
}
```

## Routing system

## Conclusion
The mini-framework offers a powerful and flexible platform for modern web development. With its DOM abstraction, routing system, and state management, it facilitates the creation of complex applications while maintaining a clear and maintainable architecture. Explore the detailed features above to discover how to implement these concepts in your project.