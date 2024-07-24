import Router from "./router.js";
import { buildComponent } from "./tools/utils.js";

buildComponent('navbar');
buildComponent('header');
buildComponent('checklist');

const routes = [
];
const router = new Router(routes);
