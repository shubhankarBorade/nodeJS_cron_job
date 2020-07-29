import {Request, ResponseBody} from "./Request.class";
import {constants} from "../constants";

export class Email {
    private requests = new Request();

    constructor() {
    }

    async sendEmail(requestPayload): Promise<ResponseBody | boolean> {
        return new Promise(async (resolve) => {
            try {
                const response = await this.requests.sendHttpsRequest(requestPayload, constants.sendgrid_api_options);
                console.log('response', response);
                return resolve(response);
            } catch (err) {
                return resolve(false);
            }
        })
    }
}