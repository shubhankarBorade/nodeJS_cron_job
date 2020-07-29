import {Request, ResponseBody} from "./Request.class";
import util from "util";

const debuglog = util.debuglog('monitor');

export class Monitor {
    static serverFailedCount: number = 0;

    constructor() {
    }

    static resetCount(): void {
        this.serverFailedCount = 0;
    }

    static checkServerHealth(): Promise<boolean> {
        return new Promise<boolean>(async (resolve) => {
            try {
                const response = await this.makeServerCall();
                debuglog('response', response);
                debuglog('failedCountBeforeUpdate', this.serverFailedCount);
                if (response.statusCode === 502) {
                    this.serverFailedCount += 1;
                    return resolve(true);
                }
                debuglog('resetting count');
                this.resetCount();
                return resolve(true)
            } catch (err) {
                console.log('error', err);
                return resolve(false)
            }
        })
    }

    private static makeServerCall(): Promise<ResponseBody> {
        return new Promise(async (resolve) => {
            const request = new Request();
            const response = await request.sendHttpsRequest(null, {
                hostname: 'test.capshot.xyz',
                method: 'GET',
                port: null,
                path: '/ping',
                headers: {
                    'content-type': 'application/json'
                },
                timeout: 1000
            });
            return resolve(response);
        })
    }

    updateBackgrounds(): Promise<void> {
        return new Promise<void>(async (resolve) => {

        })
    }
}