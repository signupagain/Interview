<template>
	<div class="selector">
		<SelectorSearch class="search" />
		<ImgSelector class="img_selector" />
	</div>
</template>
<script>
	import SelectorSearch from "./UI/Selector/SelectorSearch.vue";
	import ImgSelector from "./UI/Selector/ImgSelector.vue";

	export default {
		name: "MySelector",
		components: { SelectorSearch, ImgSelector },
	};
</script>
<style scoped>
	.selector {
		display: flex;
		flex-flow: column;
	}

	.search {
		flex-basis: 30%;
	}

	.img_selector {
		flex-basis: 70%;
	}
</style>
