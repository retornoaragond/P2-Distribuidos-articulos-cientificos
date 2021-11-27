import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import PaperIndex from "./components/BookIndex.vue";
import PaperDetails from "./components/BookDetails.vue";

const routes = [
  { path: "/", component: Home },
	
  { path: "/paper", component: paperIndex },
  { path: "/paper/show/:id", 
    component: PaperDetails, props: {show:true} },
  { path: "/paper/edit/:id", 
    component: PaperDetails, props: {edit:true} },
  { path: "/paper/create", 
    component: PaperDetails, props: {create:true} },
  { path: "/paper/delete/:id", 
    component: PaperDetails, props: {delete:true} },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;