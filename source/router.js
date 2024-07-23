export default class Router {
    constructor(routes) {
        this.routes = routes;
    }

    _matchUrlToRoute(urlSegments) {
        const matchedRoute = this.routes.find(route => {
            const routePathSegments = route.path.split('/').slice(1);
            if (routePathSegments.length !== urlSegments.length) {
                return false;
            }
            return routePathSegments.every((routePathSegment, i) => routePathSegment === urlSegments[i]);
        });
        return matchedRoute;
    }

    _loadInitialRoute() {
        const pathSegments = window.location.pathname.split('/').slice(1);
        this.loadRoute(...pathSegments);
    }

    loadRoute(...urlSegments) {
        const matchedRoute = this._matchUrlToRoute(urlSegments);

        const url = `/${urlSegments.join('/')}`;
        history.pushState({}, '', url);

        const routerOutElement = document.querySelector('[router-outlet]');
        routerOutElement.innerHTML = matchedRoute.template;
    }

}