<template>
	<div class="get_start">
		<template v-if="!loadingOver"><p>Loading...</p></template>
		<template v-else>
			<div ref="background"></div>
			<section>
				<h1>我的面試作品</h1>
				<p>本作品使用Vue2實現，並部署於Netlify</p>
				<button @click="getRandomProj">點我隨機查看</button>
				<button @click="toggleMode">
					{{ bg.mode.name }}
				</button>
				<p>
					<a :href="bg.photo_url" target="_blank" rel="noopener noreferrer">
						Photo by
						{{ bg.photographer }}
						<sub>
							<font-awesome-icon
								icon="fa-solid fa-arrow-up-right-from-square"
							/>
						</sub>
					</a>
				</p>
			</section>
		</template>
	</div>
</template>
<script>
	import axios from "axios";
	import { mapState } from "vuex";

	export default {
		name: "GetStart",
		data() {
			return {
				bg: {
					bgResponse: {},
					photo_url: "https://www.pexels.com/zh-tw/photo/1108099/",
					photographer: "Chevanon Photography",
					timer: {
						order: 0,
						random: 0,
					},
					mode: {
						name: "隨機更換",
						inOrder: true,
					},
				},
				loading: {
					isMount: false,
					alreadyGet: false,
				},
			};
		},
		computed: {
			...mapState(["projects", "authorization"]),
			loadingOver() {
				return this.loading.isMount && this.loading.alreadyGet;
			},
		},
		methods: {
			getRandomInt(max) {
				return Math.floor(Math.random() * max);
			},
			makeGenerator(max) {
				function* g(max) {
					let i = 0;

					while (true) {
						yield i++;
						if (i > max) {
							i = 0;
							yield i++;
						}
					}
				}

				return g(max);
			},
			getRandomProj() {
				const max = this.projects.length - 1;
				const randomProj = this.projects[this.getRandomInt(max) + 1];

				this.$router.push(randomProj.to);
			},
			async getBg() {
				const Authorization = this.authorization;
				const query = "路";
				const orientation = "landscape";
				const locale = "zh-TW";
				const url = `https://api.pexels.com/v1/search?query=${query}&per_page=80&orientation${orientation}&locale=${locale}`;
				const results = await axios
					.get(url, { headers: { Authorization } })
					.then((res) => res.data)
					.catch((err) => {
						console.log(err.message);
						// alert('錯誤: 無法進行背景自動轉換')
						return null;
					});
				return results;
			},
			setBg(res, duration = 15) {
				if (res === null) this.responseErrorBg();
				this.loading.alreadyGet = true;
				if (this.bg.mode.inOrder) {
					this.intervalOrderBg(res.photos, duration);
				} else {
					this.intervalRandomBg(res.photos, duration);
				}
			},
			intervalOrderBg(photos, duration) {
				const indexGenerator = this.makeGenerator(photos.length - 1);

				this.bg.timer.order = setInterval(() => {
					const index = indexGenerator.next().value;
					const photo = photos[index];
					const attrs = {
						background: `url(${photo.src.landscape}) no-repeat center`,
						"background-size": "cover",
					};
					for (let [k, v] of Object.entries(attrs)) {
						this.$refs.background.style.setProperty(k, v);
					}
					this.bg.photo_url = photo.url;
					this.bg.photographer = photo.photographer;
				}, duration * 1000);
			},
			intervalRandomBg(photos, duration) {
				this.bg.timer.random = setInterval(() => {
					const index = this.getRandomInt(photos.length);
					const photo = photos[index];
					const attrs = {
						background: `url(${photo.src.landscape}) no-repeat center`,
						"background-size": "cover",
					};
					for (let [k, v] of Object.entries(attrs)) {
						this.$refs.background.style.setProperty(k, v);
					}
					this.bg.photo_url = photo.url;
					this.bg.photographer = photo.photographer;
				}, duration * 1000);
			},
			responseErrorBg() {
				const defaultBg =
					"https://images.pexels.com/photos/1173777/pexels-photo-1173777.jpeg";
				const attrs = {
					"background-size": "cover",
					background: `url(${defaultBg}) no-repeat center`,
				};
				for (let [k, v] of Object.entries(attrs)) {
					this.$refs.background.style.setProperty(k, v);
				}
				this.bg.photo_url = "https://www.pexels.com/zh-tw/photo/1173777/";
				this.bg.photographer = "https://www.pexels.com/zh-tw/@darshan394/";
			},
			toggleMode() {
				this.bg.mode.inOrder = !this.bg.mode.inOrder;
				console.log(this.bg.mode.inOrder);
			},
		},
		watch: {
			"bg.bgResponse": {
				handler(value) {
					this.setBg(value);
				},
			},
			"bg.mode": {
				handler(value, old) {
					console.log("watch", value, old);
					if (value.inOrder) {
						this.bg.mode.name = "隨機更換";
						clearInterval(this.bg.timer.random);
						this.setBg(this.bg.bgResponse);
					} else {
						const randomT = this.bg.timer.random;
						if (randomT !== 0) clearInterval(this.bg.timer.random);
						this.bg.mode.name = "依序更換";
						clearInterval(this.bg.timer.order);
						this.setBg(this.bg.bgResponse);
					}
				},
				deep: true,
			},
		},
		async created() {
			this.bg.bgResponse = await this.getBg();
		},
		beforeDestroy() {
			clearInterval(this.bg.timer.order);
			clearInterval(this.bg.timer.random);
		},
		beforeRouteEnter(to, from, next) {
			next((vc) => {
				vc.loading.isMount = true;
			});
		},
	};
</script>
<style lang="scss" scoped>
	.get_start {
		height: 100%;
		position: relative;
		div {
			position: absolute;
			width: 100%;
			height: inherit;
			background: url("https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200")
				no-repeat center;
			background-size: cover;
		}

		section {
			position: relative;
			z-index: 1;
			top: 50%;
			transform: translateY(-50%);
			font-size: 1.5em;
			background-color: rgb(0, 128, 0, 0.5);

			h1 {
				font-size: 3em;
			}

			button {
				background-color: green;
				border-radius: 50%;
				padding: 0.5em;
				font-size: x-large;
			}
		}
	}
</style>
