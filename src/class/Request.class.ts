// const https = require('https');
import https from "https"
import http, {IncomingMessage} from "http"
import util from "util";

const debuglog = util.debuglog('request');

interface ErrorProp {
    code?: string
}

type method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface RequestOptionsProp {
    "method": method,
    "hostname": string,
    "port": number | null,
    "path": string
    "headers": {
        "authorization"?: string,
        "content-type": string,
        "content-length"?: number | string
    },
    timeout: number
}

export interface ResponseBody {
    statusCode: number,
    body: any
}

export class Request {
    constructor() {
    }

    /**
     * @description : Send https response
     * @param requestPayload
     * @param requestOptions
     * @return {Promise<{statusCode : number, body : any}>}
     */
    sendHttpsRequest = (requestPayload, requestOptions: RequestOptionsProp): Promise<ResponseBody> => {
        return new Promise(async (resolve) => {
            // Stringify the payload
            const stringPayload = typeof requestPayload === 'string' ? requestPayload : JSON.stringify(requestPayload);

            const req = https.request(requestOptions, async (res: IncomingMessage): Promise<void> => {
                return resolve(await this.handleResponse(res));
            })

            // Bind to the error event
            req.on('error', (err: ErrorProp) => {
                debuglog('error', err);
                if (err.code && err.code === 'ECONNREFUSED') {
                    return resolve({
                        statusCode: 502,
                        body: null
                    });
                }
                return resolve({
                    statusCode: 500,
                    body: null
                })
            });

            // Add the payload
            req.write(stringPayload);

            // End the request
            req.end();
        })
    }

    /**
     * @description Send http response
     * @param requestPayload
     * @param requestOptions
     */
    sendHttpRequest = (requestPayload, requestOptions: RequestOptionsProp): Promise<ResponseBody> => {
        return new Promise(async (resolve) => {
            // Stringify the payload
            const stringPayload = typeof requestPayload === 'string' ? requestPayload : JSON.stringify(requestPayload);

            const req = http.request(requestOptions, async (res: IncomingMessage) => {
                return await this.handleResponse(res);
            })

            // Bind to the error event
            req.on('error', (err: ErrorProp) => {
                debuglog('error', err);
                if (err.code && err.code === 'ECONNREFUSED') {
                    return resolve({
                        statusCode: 502,
                        body: null
                    });
                }
                return resolve({
                    statusCode: 500,
                    body: null
                })
            });

            // Add the payload
            req.write(stringPayload);

            // End the request
            req.end();
        })
    }

    private handleResponse(res: IncomingMessage): Promise<ResponseBody> {
        return new Promise(async (resolve) => {
            // Instantiate the request object
            // Grab the status of the sent request
            let responseBody = ''
            res.on('data', (chunk) => {
                responseBody += chunk;
            });
            res.on('end', () => {
                const status = res.statusCode;
                debuglog('status', status);
                debuglog('responseBody', responseBody);
                const contentType = res.headers["content-type"]

                function parseIfJSON() {
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        return JSON.parse(responseBody)
                    } else {
                        return responseBody;
                    }
                }

                // Callback successfully if the request went through
                if (status === 200 || status === 201 || status === 202) {
                    return resolve({
                        statusCode: 200,
                        body: responseBody ? parseIfJSON() : null
                    })
                } else {
                    return resolve({
                        statusCode: status,
                        body: responseBody ? parseIfJSON() : null
                    });
                }
            })
        })
    }
}