import axios from "axios";
import store from "../store/Store";

const axiosInstance = axios.create({
	baseURL: store.getState().common.endpoint,
});

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (!error.response) {
			// network or API error
			error.message =
				error.message +
				": API not responding! Check your network connection.";
		}
		throw error;
	}
);

export default axiosInstance;
