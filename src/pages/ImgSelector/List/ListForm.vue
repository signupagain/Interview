<template>
	<form @submit.prevent="filterList(searchString)">
		<div class="filter_bar" ref="filter_bar">
			<input
				ref="search"
				type="search"
				v-model="searchString"
				@focus="openHistory"
				@keyup.esc="hideHistory"
				@keyup.down="arrowDown"
				@keyup.up="arrowUp"
			/>
			<button type="submit">
				<font-awesome-icon icon="fa-solid fa-magnifying-glass" />
			</button>
		</div>
		<div class="filter_history" ref="filter_history" v-if="historyTransition">
			<transition
				tag="div"
				appear
				name="animate__animated animate__bounce"
				enter-active-class="animate__rotateIn"
				leave-active-class="animate__rotateOut"
			>
				<button
					type="button"
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
				leave-active-class="animate__lightSpeedOutRight"
			>
				<ul v-if="!destroyHistory" v-show="showHistory" key="historyList">
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
		</div>
		<div
			v-show="showHistory"
			ref="hide_history"
			@click.stop="hideHistory"
		></div>
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
				showHistory: false,
				destroyHistory: false,
				historyTransition: true,
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
			openHistory() {
				this.historyTransition = true;
				this.showHistory = true;
				this.$refs.filter_bar.style.setProperty("z-index", "99");
				this.$refs.hide_history.style.setProperty("z-index", "9");
				this.$nextTick(() =>
					this.$refs.filter_history.style.setProperty("z-index", "99")
				);
			},
			hideHistory() {
				if (this.showHistory) {
					this.$refs.filter_bar.style.removeProperty("z-index");
					this.$refs.filter_history.style.removeProperty("z-index");
					this.$refs.hide_history.style.removeProperty("z-index");
					this.showHistory = false;
					this.$refs.search.blur();
				}
			},
			noHistoryTransition() {
				this.historyTransition = false;
				this.hideHistory();
			},
		},
		mounted() {
			window.addEventListener("scroll", this.noHistoryTransition);
		},
		beforeDestroy() {
			window.addEventListener("scroll", this.noHistoryTransition);
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
<style lang="scss" scoped>
	form {
		height: 100%;

		div:last-child {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
		}
	}

	.filter_bar {
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 85%;
		display: flex;
		align-items: center;
	}

	input {
		width: 80%;
		padding-left: 0.5em;
		border: solid green;
		border-right: none;
		border-top-left-radius: 1em;
		border-bottom-left-radius: 1em;
	}

	input:focus {
		outline: none;
	}

	button[type="submit"] {
		width: 20%;
		background-color: green;
		border: solid green;
		border-left: none;
		border-top-right-radius: 1em;
		border-bottom-right-radius: 1em;
	}

	.filter_history {
		position: relative;
		top: 50%;
		left: 50%;
		transform: translateX(-50%);
		width: 85%;
		height: 0;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: flex;
		justify-content: space-between;
		background-color: black;

		span {
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
</style>
