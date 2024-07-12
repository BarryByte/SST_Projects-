import axios from "axios";

export const axiosInstance = axios.create({
	headers: {
		"Content-Type": 'application/json', // communication will happen in json format
	}
});
