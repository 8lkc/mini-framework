import Router from "./router.js";
import { buildComponent } from "./tools/utils.js";

buildComponent('filter-bar');
buildComponent('header');
buildComponent('checklist');
buildComponent('task-creator')

const routes = [
];
const router = new Router(routes);
