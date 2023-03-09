<template>
	<div id="app" ref="app">
		<MyNavigation class="mynav" />
		<keep-alive :includes="['ImgSelector', 'CatchBall']">
			<router-view class="myproj"></router-view>
		</keep-alive>
		<CopyRight class="copyright" />
	</div>
</template>

<script>
	import MyNavigation from "./components/MyNavigation";
	import CopyRight from "./components/CopyRight";

	export default {
		name: "App",
		components: {
			MyNavigation,
			CopyRight,
		},
	};
</script>

<style lang="scss">
	html {
		box-sizing: border-box;
		scroll-behavior: smooth;
		scroll-padding-top: 6em;

		::-webkit-scrollbar {
			width: 0.8em;
		}

		::-webkit-scrollbar-track {
			background: #f1f1f1;
		}

		::-webkit-scrollbar-thumb {
			background: #888;
		}

		::-webkit-scrollbar-thumb:hover {
			background: #555;
		}

		*,
		*::before,
		*::after {
			box-sizing: inherit;
		}
	}
	// border: 1px solid limegreen !important;

	body {
		padding: 0;
		margin: 0;

		a {
			color: black;
			text-decoration: none;
		}

		#app {
			font-family: Avenir, Helvetica, Arial, sans-serif;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			text-align: center;
			color: black;
			display: flex;
			flex-flow: column nowrap;

			.mynav {
				position: fixed;
				z-index: 1;
				width: 100%;
				height: 10vh;
			}

			.myproj {
				margin-top: 10vh;
				height: 85vh;
			}
			.copyright {
				height: 5vh;
			}
		}
	}
</style>
