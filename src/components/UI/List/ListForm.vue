<template>
	<form @submit.prevent="filterList(searchString)">
		<input
			ref="search"
			type="search"
			title="收尋資料夾"
			v-model="searchString"
			@focus="showHistory = true"
			@keyup.down="arrowDown"
			@keyup.left="arrowDown"
			@keyup.up="arrowUp"
			@keyup.right="arrowUp"
		/>
		<button type="submit">
			<font-awesome-icon icon="fa-solid fa-magnifying-glass" />
		</button>
		<transition
			appear
			name="animate__animated animate__bounce"
			enter-active-class="animate__rotateIn"
			leave-active-class="animate__rotateOut"
		>
			<button
				type="button"
				title="重置"
				@click="resetList"
				v-if="!destroyHistory"
				v-show="showHistory"
			>
				<font-awesome-icon icon="fa-solid fa-circle-left" />
			</button>
		</transition>
		<transition
			appear
			name="animate__animated animate__bounce"
			enter-active-class="animate__backInLeft"
			leave-active-class="animate__fadeOut"
		>
			<ul v-if="!destroyHistory" v-show="showHistory" key="historyList">
				<transition-group
					appear
					name="animate__animated animate__bounce"
					leave-active-class="animate__fadeOutRight"
				>
					<li v-for="h in history" :key="h.id" @click="select(h)">
						{{ h.value }}
						<button type="button" @click.stop="deleteHistory(h.id)">
							<font-awesome-icon icon="fa-solid fa-xmark" />
						</button>
					</li>
				</transition-group>
			</ul>
		</transition>
	</form>
</template>
<script>
	import { nanoid } from "nanoid";
	import "animate.css";

	export default {
		name: "ListForm",
		data() {
			return {
				history: JSON.parse(sessionStorage.getItem("ListHistory")) || [],
				searchString: "",
				destroyHistory: false,
				showHistory: false,
				upDownPosition: -1,
			};
		},
		methods: {
			filterList(searchString) {
				this.$store.commit("FILTE_FOLDER", searchString);
				if (searchString.trim() !== "") {
					const searchedItem = this.history
						.filter((h) => h.value === searchString)
						.pop();
					if (!searchedItem) {
						this.history.unshift({ id: nanoid(), value: searchString });
					} else {
						this.select(searchedItem);
					}
				}
				this.$refs.search.blur();
				this.showHistory = false;
				this.upDownPosition = -1;
			},
			deleteHistory(targetId) {
				this.history = this.history.filter((h) => h.id !== targetId);
			},
			select(historyObj) {
				this.$store.commit("FILTE_FOLDER", historyObj.value);
				this.searchString = historyObj.value;
				this.showHistory = false;
				this.history.sort(toTop(historyObj));

				function toTop(obj) {
					return (a, b) => {
						if (a.id === obj.id) return -1;
						if (b.id === obj.id) return 1;
						return 0;
					};
				}
			},
			resetList() {
				this.searchString = "";
				this.showHistory = false;
				this.$store.commit("FILTE_FOLDER", "");
			},
			arrowDown() {
				this.upDownPosition++;
				if (this.upDownPosition === this.history.length) {
					this.upDownPosition = 0;
				}
				this.searchString = this.history[this.upDownPosition].value;
			},
			arrowUp() {
				this.upDownPosition--;
				if (this.upDownPosition < 0) {
					this.upDownPosition = this.history.length - 1;
				}
				this.searchString = this.history[this.upDownPosition].value;
			},
		},
		watch: {
			history(value) {
				if (this.history.length === 0) {
					this.showHistory = false;
					setTimeout(() => {
						this.destroyHistory = true;
					}, 1000);
				}
				if (this.history.length > 0) this.destroyHistory = false;
				if (this.history.length > 8) this.history.pop();
				sessionStorage.setItem("ListHistory", JSON.stringify(value));
			},
		},
	};
</script>
<style scoped>
	form {
		width: 100%;
		position: relative;
	}

	ul {
		width: inherit;
		margin: 0;
		padding: 0;
		list-style: none;
		position: absolute;
		display: flex;
		flex-flow: column nowrap;
	}

	li {
		width: inherit;
		display: flex;
		justify-content: space-between;
		background-color: black;
	}
</style>
