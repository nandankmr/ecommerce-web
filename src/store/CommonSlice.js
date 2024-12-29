import { createSlice } from "@reduxjs/toolkit";

const commonSlice = createSlice({
	name: "common",
	initialState: {
		alertMessage: "",
		alertType: "success",
		isAlertOpen: false,
		endpoint: import.meta.env.VITE_API_URL,
	},
	reducers: {
		setAlertMessage: (state, param) => {
			const { payload } = param;
			state.alertMessage = payload.message;
			state.alertType = payload.type || "success";
			state.isAlertOpen = true;
		},
		hideAlertMessage: (state) => {
			state.isAlertOpen = false;
		},
	},
});

const { actions, reducer } = commonSlice;
export const {
	setAlertMessage,
	hideAlertMessage,
	toggleSearch,
	setContinueTo,
} = actions;
export default reducer;
