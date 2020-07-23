import {RequestClass, ResponseBody} from "./Request.class";
import {constants} from "../constants";

export class Email {
    private requests = new RequestClass();

    constructor() {
    }

    async sendEmail(requestPayload): Promise<ResponseBody | boolean> {
        return new Promise(async (resolve) => {
            try {
                const response = await this.requests.sendHttpsRequest(requestPayload, constants.sendgrid_api_options);
                return resolve(response);
            } catch (err) {
                return resolve(false);
            }
        })
    }
}