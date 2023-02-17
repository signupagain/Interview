<template>
	<div id="app" ref="app">
		<MyNavigation class="mynav" />
		<MyList class="mylist" />
		<MySelector class="myselector" />
		<CopyRight class="copyright" />
	</div>
</template>

<script>
	import MyNavigation from "./components/MyNavigation.vue";
	import MyList from "./components/MyList.vue";
	import MySelector from "./components/MySelector.vue";
	import CopyRight from "./components/CopyRight.vue";

	export default {
		name: "App",
		components: {
			MyNavigation,
			MyList,
			MySelector,
			CopyRight,
		},
	};
</script>

<style>
	html {
		box-sizing: border-box;
	}

	*,
	*::before,
	*::after {
		box-sizing: inherit;
	}

	body {
		padding: 0;
		margin: 0;
	}

	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		height: 100vh;
		width: 100vw;
		display: grid;
		grid-template: 10% 1fr 5% / 20% 1fr;
	}

	.mynav {
		grid-area: 1 / 1 / 2 / 3;
		border: 1px solid black;
	}

	.mylist {
		grid-area: 2 / 1 / 3 / 2;
		border: 1px solid black;
	}

	.myselect {
		grid-area: 2 / 2 / 3 / 3;
		border: 1px solid black;
	}

	.copyright {
		grid-area: 3 / 1 / 4 / 3;
		border: 1px solid black;
	}
</style>
