import { buildComponent } from "./tools/utils.js";
if(!localStorage.getItem('tasks')) localStorage.setItem('tasks', JSON.stringify([]));
buildComponent('filter-bar'); buildComponent('header'); buildComponent('checklist'); buildComponent('task-creator');
export const router = new class Router {
    constructor() {
        this.routes = [
            { path: '/', component: 'checklist' },
        ];
        this._loadInitialRoute();
    }
    _matchUrlToRoute = urlSegments => {
        const matchedRoute = this.routes.find(route => {
            const routePathSegments = route.path.split('/').slice(1);
            if (routePathSegments.length !== urlSegments.length) {return false;}
            return routePathSegments.every((routePathSegment, i) => routePathSegment === urlSegments[i]);
        });
        return matchedRoute;
    }
    _loadInitialRoute = () => {const pathSegments = window.location.pathname.split('/').slice(1); this.loadRoute(...pathSegments)}
    loadRoute = (...urlSegments) => {
        const matchedRoute = this._matchUrlToRoute(urlSegments);
        const url = `/${urlSegments.join('/')}`; history.pushState({}, '', url);
        const routerOutElement = document.querySelector('[data-router]');
        routerOutElement.innerHTML = `<${matchedRoute.component}-component></${matchedRoute.component}-component>`;
    }
}
