import {Request, ResponseBody} from "./Request.class";
import util from "util";

const debuglog = util.debuglog('monitor');

export class Monitor {
    serverFailedCount: number = 0;

    constructor() {
    }

    resetCount(): void {
        this.serverFailedCount = 0;
    }

    checkServerHealth(hostname: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve) => {
            try {
                const response = await this.makeServerCall(hostname);
                debuglog('response', response);
                debuglog('failedCountBeforeUpdate', this.serverFailedCount);
                if (response.statusCode === 502) {
                    this.serverFailedCount += 1;
                    return resolve(false);
                }
                debuglog('resetting count');
                this.resetCount();
                debuglog('server failed count after server comes back online', this.serverFailedCount);
                return resolve(true)
            } catch (err) {
                console.log('error', err);
                return resolve(false)
            }
        })
    }

    private makeServerCall(hostname: string): Promise<ResponseBody> {
        return new Promise(async (resolve) => {
            const request = new Request();
            const response = await request.sendHttpsRequest(null, {
                hostname: hostname,
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