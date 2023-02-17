<template>
	<div class="list_folder">
		<ul v-if="listSearchFilter.length !== 0">
			<li
				v-for="f in listSearchFilter"
				:key="f.id"
				@click.stop="TOGGLE_FOLDER(f.id)"
			>
				{{ f.folderName }}
				<button @click.stop="deleteOrder(f.id)">
					<font-awesome-icon icon="fa-solid fa-xmark" />
				</button>
				<ul
					class="list_items"
					v-if="f.images.length > 0"
					v-show="!!f.isOpen && f.isOpen !== undefined"
				>
					<li v-for="img in f.images" :key="img.id" @click.stop="">
						{{ img.alt }}
						<button @click.stop="deleteOrder([f.id, img.id])">
							<font-awesome-icon icon="fa-solid fa-xmark" />
						</button>
					</li>
				</ul>
			</li>
		</ul>
		<p v-else-if="!!list.listSearch">無此資料夾，請換個關鍵字</p>
		<p v-else>這裡什麼都沒有，搜尋圖片吧( ´•̥̥̥ω•̥̥̥` )</p>
	</div>
</template>
<script>
	import { mapActions, mapMutations, mapGetters, mapState } from "vuex";

	export default {
		name: "ListFolder",
		methods: {
			...mapActions(["deleteOrder"]),
			...mapMutations(["TOGGLE_FOLDER"]),
		},
		computed: {
			...mapState(["list"]),
			...mapGetters(["listSearchFilter"]),
		},
	};
</script>
<style scoped>
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		height: 100%;
		width: 100%;
		overflow: auto;
	}

	.list_folder {
		text-align: center;
	}

	.list_items {
		height: 8em;
		overflow: auto;
	}
</style>
