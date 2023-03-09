<template>
	<div>
		<transition
			appear
			name="animate__animated animate__bounce"
			enter-active-class="animate__rotateIn animate__delay-1s"
			leave-active-class="animate__rotateOut"
		>
			<ul v-if="listSearchFilter.length !== 0">
				<li
					v-for="f in listSearchFilter"
					:key="f.id"
					tabindex="0"
					@click.stop="TOGGLE_FOLDER(f)"
					@keyup.enter="TOGGLE_FOLDER(f)"
				>
					<a class="list_folder_a">
						<font-awesome-icon
							icon="fa-solid fa-chevron-right"
							:class="{ 'fa-rotate-90': f.isOpen }"
						/>
						<span v-show="!f.isEdit">
							{{ f.folderName }}
						</span>
						<input
							type="text"
							v-show="f.isEdit"
							:ref="f.id"
							:value="f.folderName"
							@blur="EDIT_FOLDER([f, $event.target.value])"
						/>
						<button @click.stop="deleteOrder(f)">
							<font-awesome-icon icon="fa-solid fa-xmark" />
						</button>
						<button v-show="!f.isEdit" @click.stop="isEdit(f)">
							<font-awesome-icon icon="fa-solid fa-pen-to-square" />
						</button>
					</a>
					<ul
						v-if="f.images.length > 0"
						v-show="!!f.isOpen && f.isOpen !== undefined"
					>
						<li
							v-for="img in f.images"
							:ref="img.id"
							:key="img.id"
							tabindex="0"
							@click.stop="chooseImg([f, img])"
						>
							<a class="list_item_a">
								{{ img.alt }}
								<button @click.stop="deleteOrder([f, img])">
									<font-awesome-icon icon="fa-solid fa-xmark" />
								</button>
							</a>
						</li>
					</ul>
				</li>
			</ul>
			<template v-else-if="!!list.listSearch">
				<p>無此資料夾，請換個關鍵字</p>
			</template>
			<template v-else>
				<p>這裡什麼都沒有，搜尋圖片吧<br />( ´•̥̥̥ω•̥̥̥` )</p>
			</template>
		</transition>
	</div>
</template>
<script>
	import { mapActions, mapMutations, mapGetters, mapState } from "vuex";
	import "animate.css";

	export default {
		name: "ListFolder",
		methods: {
			...mapActions(["deleteOrder", "chooseImg"]),
			...mapMutations(["TOGGLE_FOLDER", "EDIT_FOLDER", "IS_EDIT"]),
			isEdit(f) {
				this.IS_EDIT(f);
				this.$nextTick(() => this.$refs[f.id][0].focus());
			},
		},
		computed: {
			...mapState(["list"]),
			...mapGetters(["listSearchFilter"]),
		},
	};
</script>
<style scoped lang="scss">
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		overflow: auto;
	}
	.list_folder_a + ul {
		max-height: 10em;
	}

	button {
		float: right;
	}

	a {
		display: block;
		text-align: left;
	}

	.list_folder_a {
		margin-left: 0.3em;

		span {
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.list_item_a {
		margin-left: 1em;

		span {
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	p {
		position: relative;
		top: 50%;
		transform: translateY(-50%) 0s;
	}
</style>
