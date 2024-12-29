import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./CommonSlice";

const store = configureStore({
	reducer: {
		common: commonReducer,
	},
});

export default store;
