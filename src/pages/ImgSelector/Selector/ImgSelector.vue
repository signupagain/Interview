<template>
	<section>
		<div class="selector">
			<button type="button" @click="previous_img(selector.imgIndexPosition)">
				<font-awesome-icon icon="fa-solid fa-chevron-left" />
			</button>
			<div class="img_chosen" @click="toggleBigImg">
				<img
					:src="selector.imgChosen.src.landscape"
					:alt="selector.imgChosen.alt"
				/>
			</div>
			<button type="button" @click="next_img(selector.imgIndexPosition)">
				<font-awesome-icon icon="fa-solid fa-chevron-right" />
			</button>
			<div class="img_fullscreen" v-show="showFullScreen">
				<img
					:src="selector.imgChosen.src.original"
					:alt="selector.imgChosen.alt"
				/>
				<div @click="toggleBigImg"></div>
			</div>
		</div>
		<h1>
			<a
				:href="selector.imgChosen.url"
				target="_blank"
				rel="noopener noreferrer"
			>
				{{ selector.imgChosen.alt }}
				<sub>
					<font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
				</sub>
			</a>
		</h1>
		<p>
			<a
				:href="selector.imgChosen.photographer_url"
				target="_blank"
				rel="noopener noreferrer"
			>
				by {{ selector.imgChosen.photographer }}
				<sub>
					<font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
				</sub>
			</a>
		</p>
	</section>
</template>
<script>
	import { mapActions, mapState } from "vuex";

	export default {
		name: "ImgSelector",
		data() {
			return {
				showFullScreen: false,
			};
		},
		computed: {
			...mapState(["selector"]),
		},
		methods: {
			...mapActions(["previous_img", "next_img"]),
			toggleBigImg() {
				this.showFullScreen = !this.showFullScreen;
			},
		},
	};
</script>
<style scoped>
	a {
		color: black;
		text-decoration: none;
	}

	sub {
		font-size: 0.4em;
	}

	section {
		height: 100%;
		width: 100%;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
	}

	.selector {
		max-height: 90%;
		max-width: 100%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-around;
		align-items: center;
	}

	.img_chosen {
		width: 80%;
		height: 100%;
	}

	img {
		max-width: 100%;
		height: auto;
		object-fit: cover;
		object-position: center;
	}

	.img_fullscreen {
		position: absolute;
		z-index: 9;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.7);
	}

	.img_fullscreen > img {
		width: 80vw;
	}

	.img_fullscreen > div {
		position: absolute;
		z-index: 10;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: transparent;
	}

	button[type="button"] {
		height: 30%;
		width: 5%;
		font-size: x-large;
	}
</style>
