import Router from "./router.js";
import { buildComponent } from "./tools/utils.js";

if(!localStorage.getItem('tasks')) localStorage.setItem('tasks', JSON.stringify([]));
// const checher = JSON.parse(localStorage.getItem('tasks')); console.log(checher);

buildComponent('filter-bar');
buildComponent('header');
buildComponent('checklist');
buildComponent('task-creator')

const routes = [
];
const router = new Router(routes);
