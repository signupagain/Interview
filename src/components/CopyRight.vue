<template>
	<div>
		<hr />
		Copyright © {{ year }}
		<span v-if="isEqual">- {{ time }}</span>
		<strong>面試作品</strong> Jerry Wang All Rights Reserved
	</div>
</template>
<script>
	import dayjs from "dayjs";

	export default {
		name: "CopyRight",
		data() {
			return {
				time: dayjs().year(),
			};
		},
		computed: {
			year() {
				return this.$store.state.date;
			},
			isEqual() {
				return this.year !== this.time ? true : false;
			},
		},
	};
</script>
<style scoped>
	div {
		text-align: center;
	}
</style>
