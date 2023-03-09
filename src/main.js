import Vue from "vue";
import App from "./App";
import store from "./store";
import VueRouter from "vue-router";
import router from "./router";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
	faArrowUpRightFromSquare,
	faChevronLeft,
	faChevronRight,
	faCircleLeft,
	faMagnifyingGlass,
	faPenToSquare,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faCircleLeft);
library.add(faXmark);
library.add(faMagnifyingGlass);
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faArrowUpRightFromSquare);
library.add(faPenToSquare);

/* add font awesome icon component */
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
	render: (h) => h(App),
	store,
	router,
}).$mount("#app");
