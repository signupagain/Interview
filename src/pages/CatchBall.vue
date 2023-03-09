<template>
	<div>
		<template v-if="!isMounted">
			<p>loading...</p>
		</template>
		<template v-else>
			<canvas> 用來放Canvas的 </canvas>
		</template>
	</div>
</template>
<script>
	export default {
		name: "CatchBall",
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
