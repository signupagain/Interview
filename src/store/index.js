import Vue from "vue";
import Vuex from "vuex";
import { nanoid } from "nanoid";
import axios from "axios";

Vue.use(Vuex);

const actions = {
	searchImgFilter({ state, dispatch, commit }, searchString) {
		const sameName = state.folders.find((f) => f.folderName === searchString);
		if (sameName && typeof sameName !== "number") {
			commit("DELETE_FOLDER", sameName);
		}
		dispatch("searchImgInPexels", searchString);
	},
	async searchImgInPexels({ commit, dispatch, state }, searchString) {
		const Authorization = state.authorization;
		const page = 1;
		const per_page = 80;
		const locale = "zh-TW";
		const url = `https://api.pexels.com/v1/search?query=${searchString}&page=${page}&per_page=${per_page}&locale=${locale}`;

		const results = await axios
			.get(url, { headers: { Authorization } })
			.then((res) => Promise.resolve(res.data))
			.catch((err) => Promise.resolve(err.response.message));

		commit("SET_IMAGES_SEARCH", searchString);
		dispatch("searchImgResults", results);
	},
	searchImgResults({ commit }, results) {
		if (results.total_results !== 0) {
			commit("PUSH_FOLDER", results.photos);
		} else {
			alert("搜尋失敗，請以繁體中文輸入有用的搜尋字串");
		}
		if (typeof results === "string") {
			alert(`Error: ${results}`);
		}
		commit("RESET_IMAGES_SEARCH");
	},
	deleteOrder({ commit }, objectArray) {
		if (!Array.isArray(objectArray)) {
			commit("DELETE_FOLDER", objectArray);
			return;
		}
		commit("DELETE_IMAGE", objectArray);
	},
	chooseImg({ state, commit }, objectArray) {
		const folderIndex = state.folders.findIndex((f) => f === objectArray[0]);
		const imageIndex = state.folders[folderIndex].images.findIndex(
			(i) => i === objectArray[1]
		);
		commit("IMG_CHOSEN", objectArray[1]);
		commit("IMG_INDEX_POSITION", [folderIndex, imageIndex]);
	},
	previous_img({ state, commit }, indexArray_Folder_Img) {
		const folderState = state.selector.folderState;

		if (folderState.length === 0) {
			alert("目前沒有資料夾，請輸入關鍵字搜尋圖片");
			return;
		}

		const isEmpty = folderState.reduce((p, c) => p + c);
		if (isEmpty === 0) {
			alert("目前資料夾沒有圖片，請輸入關鍵字搜尋圖片");
			return;
		}

		if (indexArray_Folder_Img[1] === 0) {
			if (indexArray_Folder_Img[0] === 0) {
				const folderIndex = folderState.findLastIndex((el) => el > 0);
				const imgIndex = folderState[folderIndex] - 1;

				const imageObj = state.folders[folderIndex].images[imgIndex];
				const imageIndexArray = [folderIndex, imgIndex];
				commit("OBLIGE_OPEN_FOLDER", folderIndex);
				commit("CLOSE_OTHERS_FOLDER", state.folders[folderIndex]);
				commit("SET_SELECTOR_ITEMS", [imageObj, imageIndexArray]);
			} else {
				let folderIndex = folderState.findLastIndex((el, index) => {
					if (index < indexArray_Folder_Img[0]) {
						return el > 0;
					}
					return false;
				});
				if (folderIndex === -1) {
					folderIndex = folderState.findLastIndex((el) => el > 0);
				}
				const imgIndex = folderState[folderIndex] - 1;

				const imageObj = state.folders[folderIndex].images[imgIndex];
				const imageIndexArray = [folderIndex, imgIndex];
				commit("OBLIGE_OPEN_FOLDER", folderIndex);
				commit("CLOSE_OTHERS_FOLDER", state.folders[folderIndex].id);
				commit("SET_SELECTOR_ITEMS", [imageObj, imageIndexArray]);
			}
			return;
		}

		const imageObj =
			state.folders[indexArray_Folder_Img[0]].images[
				indexArray_Folder_Img[1] - 1
			];
		const imageIndexArray = [
			indexArray_Folder_Img[0],
			indexArray_Folder_Img[1] - 1,
		];

		commit("SET_SELECTOR_ITEMS", [imageObj, imageIndexArray]);
	},
	next_img({ state, commit }, indexArray_Folder_Img) {
		const folderState = state.selector.folderState;

		if (folderState.length === 0) {
			alert("目前沒有資料夾，請輸入關鍵字搜尋圖片");
			return;
		}

		const isEmpty = folderState.reduce((p, c) => p + c);
		if (isEmpty === 0) {
			alert("目前資料夾內沒有圖片，請輸入關鍵字搜尋圖片");
			return;
		}

		const foldersLastIndex = folderState.length - 1;
		const imagesLastIndex =
			state.folders[indexArray_Folder_Img[0]].images.length - 1;

		if (indexArray_Folder_Img[1] === imagesLastIndex) {
			if (indexArray_Folder_Img[0] === foldersLastIndex) {
				const folderIndex = folderState.findIndex((el) => el > 0);
				const imgIndex = 0;

				const imageObj = state.folders[folderIndex].images[imgIndex];
				const imageIndexArray = [folderIndex, imgIndex];

				commit("OBLIGE_OPEN_FOLDER", folderIndex);
				commit("CLOSE_OTHERS_FOLDER", state.folders[folderIndex]);
				commit("SET_SELECTOR_ITEMS", [imageObj, imageIndexArray]);
			} else {
				let folderIndex = folderState.findIndex((el, index) => {
					if (index > indexArray_Folder_Img[0]) {
						return el > 0;
					}
				});
				if (folderIndex === -1) {
					folderIndex = folderState.findIndex((el) => el > 0);
				}
				const imgIndex = 0;

				const imageObj = state.folders[folderIndex].images[imgIndex];
				const imageIndexArray = [folderIndex, imgIndex];

				commit("OBLIGE_OPEN_FOLDER", folderIndex);
				commit("CLOSE_OTHERS_FOLDER", state.folders[folderIndex]);
				commit("SET_SELECTOR_ITEMS", [imageObj, imageIndexArray]);
			}
			return;
		}

		const imageObj =
			state.folders[indexArray_Folder_Img[0]].images[
				indexArray_Folder_Img[1] + 1
			];
		const imageIndexArray = [
			indexArray_Folder_Img[0],
			indexArray_Folder_Img[1] + 1,
		];

		commit("SET_SELECTOR_ITEMS", [imageObj, imageIndexArray]);
	},
};

const mutations = {
	PUSH_FOLDER(state, photos) {
		state.folders.push({
			id: nanoid(),
			folderName: state.selector.imagesSearch,
			images: photos,
		});
		state.selector.imagesSearch = "";
		state.selector.folderState.push(photos.length);
	},
	DELETE_FOLDER(state, folder) {
		state.folders = state.folders.filter((f) => f !== folder);
	},
	DELETE_IMAGE(_, deleteArray) {
		deleteArray[0].images = deleteArray[0].images.filter(
			(img) => img !== deleteArray[1]
		);
	},
	EDIT_FOLDER(_, editArray) {
		editArray[0].folderName = editArray[1];
		editArray[0].isEdit = false;
	},
	TOGGLE_FOLDER(_, folder) {
		if (Object.hasOwn(folder, "isOpen")) {
			folder.isOpen = !folder.isOpen;
			return;
		}
		Vue.set(folder, "isOpen", true);
	},
	IS_EDIT(_, folder) {
		if (Object.hasOwn(folder, "isEdit")) {
			folder.isEdit = true;
			return;
		}
		Vue.set(folder, "isEdit", true);
	},
	OBLIGE_OPEN_FOLDER(state, folderIndex) {
		if (Object.hasOwn(state.folders[folderIndex], "isOpen")) {
			state.folders[folderIndex].isOpen = true;
			return;
		}
		Vue.set(state.folders[folderIndex], "isOpen", true);
	},
	CLOSE_OTHERS_FOLDER(state, folder) {
		state.folders.forEach((f) => {
			if (f.hasOwnProperty.call(f, "isOpen") && f !== folder) {
				Vue.set(f, "isOpen", false);
			}
		});
	},
	FILTE_FOLDER(state, searchString) {
		state.list.listSearch = searchString;
	},
	SET_IMAGES_SEARCH(state, searchString) {
		state.selector.imagesSearch = searchString;
	},
	RESET_IMAGES_SEARCH(state) {
		state.selector.imagesSearch = "";
	},
	IMG_CHOSEN(state, imageObj) {
		state.selectorimgChosen = imageObj;
	},
	IMG_INDEX_POSITION(state, indexArray) {
		state.selectorimgIndexPosition = indexArray;
	},
	SET_SELECTOR_ITEMS(state, selectorObj) {
		state.selector.imgChosen = selectorObj[0];
		state.selector.imgIndexPosition = selectorObj[1];
	},
};

const state = {
	projects: [
		{ id: nanoid(), proj: "開始界面", to: "/GetStart" },
		{ id: nanoid(), proj: "美圖搜尋", to: "/ImagesSelector" },
		{ id: nanoid(), proj: "捕球遊戲", to: "/CatchBall" },
	],
	experience: "/Experience",
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
	authorization: "i0ZWkAQ4aGAQgGqvL0D0o6Qo9VXJXJo03M6ANTpRerJLHT7O7Vfc6dtF",
	list: {
		listSearch: "",
		deleteInFolderId: 0,
		newIsOpen: -1,
	},
	selector: {
		imagesSearch: "",
		imgChosen: {
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
		imgIndexPosition: [0, 0],
		folderState: [1],
	},
};

const getters = {
	listSearchFilter(state) {
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
