import {Notification} from "./class/Notification.class";
import {User} from "./class/User.class";
import util from "util";
import {Monitor} from "./class/Monitor.class";
import {Email} from "./class/Email.class";
import {constants} from "./constants";
import {GetFiles} from "./google-drive/google-drive";
import config from "./config";
import fs from "fs";
import path from "path";
import {Request, RequestOptionsProp} from "./class/Request.class";

const debuglog = util.debuglog('cron');

interface UserProp {
    id: number,
    userName: string,
    firebaseToken: string
}

interface GoogleDriveFilesProp {
    kind: string,
    id: string,
    name: string,
    mimeType: string,
    webContentLink: string
}


async function checkProductionServerHealth(): Promise<void> {
    try {
        // const monitor = new Monitor();
        await Monitor.checkServerHealth();
        console.log('returned serverFailedCount', Monitor.serverFailedCount);
        if (Monitor.serverFailedCount && Monitor.serverFailedCount % 3 === 0) {
            // send an email
            const email = new Email();
            const serverFailedEmailPayload = JSON.stringify(constants.serverFailedEmail);
            // const response = await email.sendEmail(serverFailedEmailPayload);
            // console.log('Email response', response);
            Monitor.resetCount();
            console.log('serverFailedCount after reset', Monitor.serverFailedCount);
            return;
        }
    } catch (err) {
        console.log('error', err);
        debuglog('error', err);
    }
}

async function checkProductionServerHealth2(): Promise<void> {
    try {
        // const monitor = new Monitor();
        await Monitor.checkServerHealth();
        console.log('returned serverFailedCount from 2', Monitor.serverFailedCount);
        if (Monitor.serverFailedCount && Monitor.serverFailedCount % 3 === 0) {
            // send an email
            const email = new Email();
            const serverFailedEmailPayload = JSON.stringify(constants.serverFailedEmail);
            // const response = await email.sendEmail(serverFailedEmailPayload);
            // console.log('Email response', response);
            Monitor.resetCount();
            console.log('serverFailedCount after reset from 2', Monitor.serverFailedCount);
            return;
        }
    } catch (err) {
        console.log('error', err);
        debuglog('error', err);
    }
}


export class Cron {
    constructor() {
    }

    static async init() {
        try {
            // // const everydayRunAt7 = new CronOperation('0 0 19 * * *', sendPun);
            // // everydayRunAt7.init();
            // const checkServerHealth = new CronOperation('1 * * * * *', getDataFromGoogleDrive)
            // checkServerHealth.init();
            // // const checkServerHealth2 = new CronOperation('2 * * * * *', checkProductionServerHealth2)
            // // checkServerHealth2.init();
            // // await checkProductionServerHealth()
            await getDataFromGoogleDrive();
        } catch (err) {
            console.log('error', err);
            return err;
        }
    }
}

async function getDataFromGoogleDrive(): Promise<void> {
    try {
        interface RequestPayloadToUploadBackground {
            url: string,
            name: string
        }

        const files: GoogleDriveFilesProp[] = await GetFiles();
        let jsonFilePath = path.join(__dirname + '/google-drive/backgrounds.json');
        fs.readFile(jsonFilePath, 'utf8', (err: Error, data: string): void => {
            if (err) {
                console.log('error', err);
                return;
            }
            const parsedData = JSON.parse(data);
            const dataToSend: RequestPayloadToUploadBackground[] = [];
            files.map(file => {
                if (!parsedData[config.name][file.id]) {
                    // parsedData[config.name][file.id] = file;
                    dataToSend.push({
                        url: file.webContentLink,
                        name: file.name
                    });
                }
            });
            const stringifyData = JSON.stringify(parsedData);
            fs.writeFile(jsonFilePath, stringifyData, async (err: Error): Promise<void> => {
                console.log('error', err);
                if (err) return;

                if (dataToSend.length) {
                    // update in the database
                    const stringifyPayload = JSON.stringify(dataToSend);
                    const request = new Request();
                    const requestOptions: RequestOptionsProp = {
                        method: 'POST',
                        path: "/backgrounds",
                        port: null,
                        timeout: 1000,
                        hostname: config.remote_server_url,
                        headers: {
                            "content-type": 'application/json',
                            "content-length": Buffer.byteLength(stringifyPayload)
                        },
                    }
                    const responseFromServer = await request.sendHttpRequest(stringifyPayload, requestOptions);
                    console.log('responseFromServer', responseFromServer);
                }
            })
        })
    } catch (err) {
        console.log('error', err);
        return err;
    }
}

async function sendPun(): Promise<void> {
    try {
        // fetch the users who have android version code more than required
        const users: UserProp[] = await User.getUserOfAndroidVersionCode(153);
        const firebaseToken: string[] = users.map(user => user.firebaseToken);

        // send notification on 7 pm
        const notificationBody = Notification.getRandomPun('indians');
        for (let token of firebaseToken) {
            const notification = new Notification(token);
            await notification.sendNotification({
                title: 'Meme O\'Clock! ⏰',
                body: notificationBody,
                intent: 'notify'
            })
        }
    } catch (err) {
        console.log('error', err);
    }
}


