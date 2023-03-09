import VueRouter from "vue-router";
import store from "../store";
const projlist = store.state.projects;

const routes = [
	{
		path: "/",
		redirect: "/GetStart",
	},
	{
		path: "/GetStart",
		component: () =>
			import(/* webpackChunkName: 'GetStart' */ "../pages/GetStart"),
		meta: {
			title: projlist[0].proj,
		},
	},
	{
		path: "/ImagesSelector",
		component: () =>
			import(
				/* webpackChunkName: 'ImagesSelector' */ "../pages/ImgSelector/ImagesSelector"
			),
		meta: {
			title: projlist[1].proj,
		},
	},
	{
		path: "/CatchBall",
		component: () =>
			import(/* webpackChunkName: 'CatchBall' */ "../pages/CatchBall"),
		meta: {
			title: projlist[2].proj,
		},
	},
	{
		path: "/Experience",
		component: () =>
			import(/* webpackChunkName: 'MyExperience' */ "../pages/MyExperience"),
		meta: {
			title: "經歷",
		},
	},
	{
		path: "*",
		component: () =>
			import(/* webpackChunkName: 'NotFound' */ "../pages/NotFound"),
		meta: {
			title: "404 Not Found",
		},
	},
];

const router = new VueRouter({
	routes,
	scrollBehavior() {
		return new Promise((res) => {
			setTimeout(() => res({ x: 0, y: 0 }), 100);
		});
	},
});

router.afterEach((to) => (document.title = to.meta.title || "我的面試作品"));

export default router;
