<template>
	<div class="list">
		<ListForm class="search" />
		<ListFolder class="folder" />
	</div>
</template>
<script>
	import ListForm from "./UI/List/ListForm.vue";
	import ListFolder from "./UI/List/ListFolder.vue";

	export default {
		name: "MyList",
		components: { ListForm, ListFolder },
	};
</script>
<style scoped>
	.list {
		display: flex;
		flex-flow: column;
	}

	.folder {
		overflow: auto;
	}
</style>
