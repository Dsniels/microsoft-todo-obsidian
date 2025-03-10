import { Auth } from "auth/main";
import { Axios } from "axios";

export class HttpClient extends Auth {
	private baseUrl = "";
	private axios: Axios;

	constructor() {
		super();
		this.AxiosInit();
	}

	private AxiosInit() {
		this.axios = new Axios();
		this.axios.defaults.baseURL = this.baseUrl;
		this.axios.interceptors.request.use((config) => {
			const token = this.token;
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		});
	}

	get(endpoint: string) {
		return this.axios.get(`${endpoint}`);
	}

	post(endpoint: string, data: unknown) {
		return this.axios.post(`${endpoint}`, data);
	}

	put(endpoint: string, data: unknown) {
		return this.axios.put(endpoint, data);
	}
}
