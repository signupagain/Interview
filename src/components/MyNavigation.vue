<template>
	<div>
		<nav>
			<ul class="nav_ul">
				<li>
					<a href="#">&emsp;作品</a>
					<ul class="project">
						<li v-for="project in projects" :key="project.id">
							<a :href="project.href">{{ project.proj }}</a>
						</li>
					</ul>
				</li>
				<li><a href="#">經歷</a></li>
				<li><a href="#">聯絡方式</a></li>
			</ul>
		</nav>
	</div>
</template>

<script>
	import { nanoid } from "nanoid";

	export default {
		name: "MyNavigation",
		data() {
			return {
				projects: [
					{ id: nanoid(), proj: "選圖界面", href: "#" },
					{ id: nanoid(), proj: "捕球遊戲", href: "#" },
				],
			};
		},
	};
</script>

<style scoped>
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	a {
		text-decoration: none;
		color: black;
	}

	nav {
		box-sizing: border-box;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding: 1em;
		font-size: 1.5em;
	}

	.nav_ul {
		display: flex;
		margin-right: 1em;
	}

	.nav_ul > li {
		padding: 0 1em;
		border-right: 1px solid black;
	}

	.nav_ul > li:last-child {
		border-right: none;
	}

	.project {
		display: none;
	}

	.nav_ul > li:first-child:hover .project {
		display: block;
		position: absolute;
		text-align: center;
		padding: 0.5em 0;
	}

	.project > li {
		padding: 0.1em;
	}
</style>
