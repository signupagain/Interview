<template>
	<div class="imgselector_layout">
		<template v-if="!isMounted">
			<p>Loading...</p>
		</template>
		<template v-else>
			<ListForm class="search" />
			<ListFolder class="folder" />
			<SelectorSearch class="sel_search" />
			<ImgSelector class="img_selector" />
		</template>
	</div>
</template>
<script>
	const components = {
		ListFolder: () => import("./List/ListFolder"),
		ListForm: () => import("./List/ListForm"),
		ImgSelector: () => import("./Selector/ImgSelector"),
		SelectorSearch: () => import("./Selector/SelectorSearch"),
	};

	export default {
		name: "ImagesSelector",
		components,
		data() {
			return { isMounted: false };
		},
		beforeRouteEnter(to, from, next) {
			next((vc) => (vc.isMounted = true));
		},
	};
</script>
<style scoped>
	.imgselector_layout {
		display: grid;
		grid-template: repeat(10, 1fr) / 30% 70%;
	}

	.search {
		grid-area: 1/1/2/2;
	}

	.folder {
		grid-area: 2/1/-1/2;
		padding: 5px;
		margin-bottom: 1em;
		border: solid green;
		border-radius: 5px;
	}

	.sel_search {
		grid-area: 1/2/3/3;
	}

	.img_selector {
		grid-area: 3/2/-1/3;
	}
</style>
