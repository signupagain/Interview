<template>
	<div>
		<form @submit.prevent="filterList(searchString)">
			<div class="search_bar">
				<input
					ref="searchImg"
					type="search"
					v-model="searchString"
					@focus="openHistory"
					@keyup.esc="hide_history"
					@keyup.down="arrowDown"
					@keyup.up="arrowUp"
				/>
				<button type="submit">
					<font-awesome-icon icon="fa-solid fa-magnifying-glass" />
				</button>
			</div>
			<transition
				appear
				name="animate__animated animate__bounce"
				enter-active-class="animate__fadeInDown"
				leave-active-class="animate__fadeOut"
			>
				<ul
					v-if="!destroyHistory"
					v-show="showHistory"
					key="searchHistoryList"
					ref="search_history"
				>
					<transition-group
						appear
						name="animate__animated animate__bounce"
						leave-active-class="animate__fadeOutRight"
					>
						<li v-for="h in history" :key="h.id" @click="select(h)">
							<span>
								{{ h.value }}
							</span>
							<button type="button" @click.stop="deleteHistory(h.id)">
								<font-awesome-icon icon="fa-solid fa-xmark" />
							</button>
						</li>
					</transition-group>
				</ul>
			</transition>
		</form>
		<div
			class="hide_history"
			ref="hide_history"
			@click="hide_history"
			v-show="showHistory"
		></div>
	</div>
</template>
<script>
	import { nanoid } from "nanoid";
	import "animate.css";

	export default {
		name: "SelectorSearch",
		data() {
			return {
				history: JSON.parse(sessionStorage.getItem("searchImgHistory")) || [],
				searchString: "",
				destroyHistory: false,
				showHistory: false,
				upDownPosition: -1,
			};
		},
		methods: {
			filterList(searchString) {
				if (searchString.trim() !== "") {
					this.$store.dispatch("searchImgFilter", searchString);
					const searchedItem = this.history
						.filter((h) => h.value === searchString)
						.pop();
					if (!searchedItem) {
						this.history.unshift({ id: nanoid(), value: searchString });
					} else {
						this.select(searchedItem);
					}
				}
				this.$refs.searchImg.value = "";
				this.$refs.searchImg.blur();
				this.showHistory = false;
				this.upDownPosition = -1;
			},
			deleteHistory(targetId) {
				this.history = this.history.filter((h) => h.id !== targetId);
			},
			select(historyObj) {
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
			arrowDown() {
				this.upDownPosition++;
				if (this.upDownPosition === this.history.length) {
					this.upDownPosition = 0;
				}
				setTimeout(() => {
					this.searchString = this.history[this.upDownPosition].value;
					this.$refs.searchImg.selectionStart =
						this.$refs.searchImg.selectionEnd = 10000;
				}, 0);
			},
			arrowUp() {
				this.upDownPosition--;
				if (this.upDownPosition < 0) {
					this.upDownPosition = this.history.length - 1;
				}
				setTimeout(() => {
					this.searchString = this.history[this.upDownPosition].value;
					this.$refs.searchImg.selectionStart =
						this.$refs.searchImg.selectionEnd = 10000;
				}, 0);
			},
			openHistory() {
				this.showHistory = true;
				this.$refs.searchImg.style.setProperty("z-index", "99");
				this.$refs.search_history.style.setProperty("z-index", "99");
				this.$refs.hide_history.style.setProperty("z-index", "9");
			},
			hide_history() {
				if (this.showHistory) {
					this.$refs.searchImg.style.removeProperty("z-index");
					this.$refs.search_history.style.removeProperty("z-index");
					this.$refs.hide_history.style.removeProperty("z-index");
					this.showHistory = false;
					this.$refs.searchImg.blur();
				}
			},
		},
		mounted() {
			window.addEventListener("scroll", this.hide_history);
		},
		beforeDestroy() {
			window.addEventListener("scroll", this.hide_history);
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
				sessionStorage.setItem("searchImgHistory", JSON.stringify(value));
			},
		},
	};
</script>
<style scoped>
	form {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.search_bar {
		position: absolute;
		width: 85%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
	}

	input {
		font-size: 1.5rem;
		padding: 0.5rem;
		border-top-left-radius: 2rem;
		border-bottom-left-radius: 2rem;
		border: 5px solid green;
		border-right: none;
	}

	input:focus {
		outline: none;
	}

	button[type="submit"] {
		font-size: 1.5rem;
		padding: 0.5rem;
		border-top-right-radius: 2rem;
		border-bottom-right-radius: 2rem;
		border: 5px solid green;
		border-left: none;
		background-color: green;
	}

	ul {
		position: absolute;
		z-index: 2;
		top: 65%;
		width: 55%;
		margin: 0;
		padding: 0;
		list-style: none;
		position: absolute;
	}

	li {
		padding: 0.2rem;
		background-color: green;
		cursor: pointer;
	}

	li > span {
		display: inline-block;
		width: 50%;
		overflow-x: hidden;
		text-overflow: ellipsis;
	}

	li > button {
		float: right;
		margin-right: 2rem;
	}

	li:first-child {
		border-top-left-radius: 2rem;
		border-top-right-radius: 2rem;
	}

	li:last-child {
		border-bottom-left-radius: 2rem;
		border-bottom-right-radius: 2rem;
	}

	.hide_history {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
	}
</style>
