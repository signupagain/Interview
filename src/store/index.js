import Vue from "vue";
import Vuex from "vuex";
import { nanoid } from "nanoid";
import { createClient } from "pexels";

Vue.use(Vuex);

const actions = {
	searchImgFilter({ state, dispatch, commit }, searchString) {
		const sameName = state.folders
			.filter((f) => f.folderName === searchString)
			.pop();
		if (sameName) {
			commit("DELETE_FOLDER", sameName.id);
		}
		dispatch("searchImgInPexels", searchString);
	},
	async searchImgInPexels({ commit, dispatch }, searchString) {
		const client = createClient(
			"i0ZWkAQ4aGAQgGqvL0D0o6Qo9VXJXJo03M6ANTpRerJLHT7O7Vfc6dtF"
		);
		const query = searchString;
		const results = await client.photos
			.search({
				query,
				page: 1,
				per_page: 80,
				locale: ["zh-TW"],
			})
			.then((photos) => Promise.resolve(photos));

		commit("SET_IMAGES_SEARCH", searchString);
		dispatch("searchImgResults", results);
	},
	searchImgResults({ commit }, results) {
		if (results.total_results !== 0) {
			commit("PUSH_FOLDER", results.photos);
		} else {
			alert("搜尋失敗，請以繁體中文輸入有用的搜尋字串");
			commit("RESET_IMAGES_SEARCH");
		}
	},
	deleteOrder({ commit }, idArray) {
		if (!Array.isArray(idArray)) {
			commit("DELETE_FOLDER", idArray);
			return;
		}
		commit("DELETE_IMAGE", idArray);
	},
};

const mutations = {
	PUSH_FOLDER(state, photos) {
		state.folders.push({
			id: nanoid(),
			folderName: state.imagesSearch,
			images: photos,
		});
		state.imagesSearch = "";
	},
	DELETE_FOLDER(state, targetId) {
		state.folders = state.folders.filter((f) => f.id !== targetId);
	},
	DELETE_IMAGE(state, idArray) {
		const folderIndex = state.folders.findIndex((f) => f.id === idArray[0]);
		state.folders[folderIndex].images = state.folders[
			folderIndex
		].images.filter((img) => img.id !== idArray[1]);
	},
	TOGGLE_FOLDER(state, folderId) {
		const folderIndex = state.folders.findIndex((f) => f.id === folderId);
		if (!state.folders[folderIndex].isOpen) {
			Vue.set(state.folders[folderIndex], "isOpen", true);
			return;
		}
		state.folders[folderIndex].isOpen = !state.folders[folderIndex].isOpen;
	},
	FILTE_FOLDER(state, searchString) {
		state.list.listSearch = searchString;
	},
	SET_IMAGES_SEARCH(state, searchString) {
		state.imagesSearch = searchString;
	},
	RESET_IMAGES_SEARCH(state, searchString) {
		state.imagesSearch = "";
	},
};

const state = {
	folders: [
		{
			id: nanoid(),
			folderName: "喜歡的圖片",
			images: [
				{
					id: 1108099,
					width: 5184,
					height: 3888,
					url: "https://www.pexels.com/zh-tw/photo/1108099/",
					photographer: "Chevanon Photography",
					photographer_url: "https://www.pexels.com/zh-tw/@chevanon",
					photographer_id: 93955,
					avg_color: "#787A50",
					src: {
						original:
							"https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
						large2x:
							"https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
						large:
							"https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
						medium:
							"https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&h=350",
						small:
							"https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&h=130",
						portrait:
							"https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
						landscape:
							"https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
						tiny: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
					},
					liked: false,
					alt: "兩隻黃色的拉布拉多犬幼犬",
				},
			],
		},
	],
	date: 2023,
	imagesSearch: "",
	list: {
		listSearch: "",
		deleteInFolderId: 0,
	},
};

const getters = {
	listSearchFilter(state) {
		console.log(state.folders);
		return state.folders.filter((f) =>
			f.folderName.includes(state.list.listSearch)
		);
	},
};

export default new Vuex.Store({
	actions,
	mutations,
	state,
	getters,
});
