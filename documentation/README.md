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
The `Router` class is a lightweight routing solution for managing URL paths and dynamically loading components based on the current path in a single-page application (SPA). It maps URL segments to specific components and ensures smooth navigation without full page reloads.

### Features
- Manages navigation between routes.
- Updates the URL using the History API (`pushState`).
- Dynamically loads components into the DOM based on the current route.
- Supports back/forward navigation.

### Class Definition
**Properties**
- `routes`: An array of route objects. Each route object has two properties:
    - `path`: The URL path to match.
    - `component`: The component to render when the path is matched.

**Example:**
```
const router = new Router({
    routes: [
        { path: '/', component: 'home' },
        { path: '/completed', component: 'completed-list' },
        { path: '/pending', component: 'pending-list' },
    ]
});
```

**Methods**

`constructor()`

Initializes the router by setting up the routes, loading the initial route, and handling the browser's back and forward buttons.

`_loadInitialRoute()`

Loads the initial route when the page is first accessed or reloaded.

`_loadRouteFromPath()`

Loads a route based on the current URL path.

`_matchUrlToRoute(urlSegments)`

Finds and returns a route from `this.routes` that matches the provided URL segments.

*Parameters:*
- `...urlSegments`: URL path segments (e.g., `['pending']` for `/pending`).

*Usage Example:*
```
// Load the checklist component for the current route
router.loadRoute('completed');
```

### Usage Example

**Basic Setup**

To use the Router class, define your routes and components:
```
const router = new Router({
    routes: [
        { path: '/', component: 'checklist' },
        { path: '/completed', component: 'checklist' },
        { path: '/pending', component: 'checklist' }
    ]
});
```
Then, in your HTML, define a placeholder for the dynamic component rendering:
```
<div data-router></div>
```
When navigating through the app, the router will automatically update the content of the `<div data-router>` element with the corresponding component for the current path. For example:
- `localhost/` loads `<checklist-component></checklist-component>`
- `localhost/completed` loads the same checklist component for completed tasks.

**Navigating Programmatically**

You can load routes programmatically using the `loadRoute` method:
```
// Navigate to the completed tasks page
router.loadRoute('completed');
```

**Back/Forward Navigation**

The router supports back and forward button navigation via the `window.onpopstate` event.

## Conclusion
The mini-framework offers a powerful and flexible platform for modern web development. With its DOM abstraction, routing system, and state management, it facilitates the creation of complex applications while maintaining a clear and maintainable architecture. Explore the detailed features above to discover how to implement these concepts in your project.
