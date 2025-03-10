import {
	AuthenticationResult,
	ConfidentialClientApplication,
	Configuration,
} from "@azure/msal-node";

const msalConfig: Configuration = {
	auth: {
		clientId: process.env.CLIENT_ID as string,
		authority: process.env.ADD_ENDPOINT + "/" + process.env.TENANT_ID,
		clientSecret: process.env.CLIENT_SECRET,
	},
};

const tokenRequest = {
	scopes: [process.env.GRAPH_ENDPOINT + "/.default"],
};

export class Auth {
	cca: ConfidentialClientApplication;
	protected token: AuthenticationResult;
	constructor() {
		this.onInit();
	}

	private async onInit() {
		this.cca = new ConfidentialClientApplication(msalConfig);
		this.token = (await this.getToken()) as AuthenticationResult;
	}

	private getToken() {
		return this.cca.acquireTokenByClientCredential(tokenRequest);
	}
}
