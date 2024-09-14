import { buildComponent } from "./tools/utils.js";
if(!localStorage.getItem('availableId')) localStorage.setItem('availableId', 0);
if(!localStorage.getItem('tasks')) localStorage.setItem('tasks', JSON.stringify([]));
buildComponent('filter-bar'); buildComponent('header'); buildComponent('checklist'); buildComponent('task-creator'); buildComponent('footer');
export const router = new class Router {
    constructor() {
        this.routes = [
            { path: '/', component: 'checklist' },
            { path: '/completed', component: 'checklist' },
            { path: '/active', component: 'checklist' },
        ];
        this._loadInitialRoute();
        window.onpopstate = () => this._loadRouteFromPath();
    }
    _matchUrlToRoute(urlSegments) {
        return this.routes.find(route => {
            const routePathSegments = route.path.split('/').slice(1);
            return routePathSegments.length === urlSegments.length &&
                   routePathSegments.every((segment, i) => segment === urlSegments[i]);
        });
    }
    _loadInitialRoute() {const pathSegments = window.location.pathname.split('/').slice(1); this.loadRoute(...pathSegments)}
    _loadRouteFromPath() {const pathSegments = window.location.pathname.split('/').slice(1); this.loadRoute(...pathSegments)}
    loadRoute(...urlSegments) {
        const matchedRoute = this._matchUrlToRoute(urlSegments); if (!matchedRoute) {console.error('Route not found!'); return}
        const url = `/${urlSegments.join('/')}`; if (window.location.pathname !== url) history.pushState({}, '', url);
        const routerOutElement = document.querySelector('[data-router]');
        routerOutElement.innerHTML = `<${matchedRoute.component}-component></${matchedRoute.component}-component>`;
    }
}
