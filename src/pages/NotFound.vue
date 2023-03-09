<template>
	<div>
		<template v-if="!isMounted">
			<p>loading...</p>
		</template>
		<template>
			<section>
				<h1>404 Not Found...</h1>
				<router-link to="/GetStart">點擊回到開始界面</router-link>
			</section>
		</template>
	</div>
</template>
<script>
	export default {
		name: "NotFound",
		data() {
			return {
				isMounted: false,
			};
		},
		beforeRouteEnter(to, from, next) {
			next((vc) => (vc.isMounted = true));
		},
	};
</script>
<style scoped>
	section {
		display: inline-block;
		position: relative;
		top: 50%;
		transform: translate(0, -50%);
	}
</style>
