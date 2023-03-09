<template>
	<nav>
		<ul class="nav_ul">
			<li>
				個人作品
				<ul class="project">
					<li v-for="project in projects" :key="project.id">
						<router-link :to="project.to">{{ project.proj }}</router-link>
					</li>
				</ul>
			</li>
			<li><router-link :to="experience">經歷</router-link></li>
		</ul>
	</nav>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "MyNavigation",
		computed: {
			...mapState(["projects", "experience"]),
		},
	};
</script>

<style scoped>
	ul {
		height: min-content;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	a {
		text-decoration: none;
		color: black;
	}

	nav {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 1.5em;
		color: black;
		background-color: green;
	}

	.nav_ul {
		display: flex;
		margin-right: 1em;
	}

	.nav_ul > li {
		padding: 0 1em;
		position: relative;
		cursor: default;
	}

	.nav_ul > :not(li:first-child) {
		border-left: 1px solid black;
	}

	.project {
		visibility: hidden;
		width: max-content;
		padding: 0.3em;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		background-color: green;
		position: absolute;
		top: 100%;
		transform: translate(-7px);
		opacity: 0;
		transition: visibility 1s, opacity 1s;
	}

	.nav_ul > li:first-child:hover .project {
		visibility: visible;
		opacity: 1;
		transition: opacity 1s;
	}

	.project > li:hover ::before {
		content: "";
		margin-right: 2px;
		border-left: 5px solid yellow;
	}
</style>
