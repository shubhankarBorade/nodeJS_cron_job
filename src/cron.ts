import {Notification} from "./class/Notification.class";
import {User} from "./class/User.class";
import {Monitor} from "./class/Monitor.class";
import {Email} from "./class/Email.class";
import {constants} from "./constants";
import {CronOperation} from "./class/Cron-operations.class";
import config from "./config";

const stagingServerMonitor = new Monitor();

interface UserProp {
    id: number,
    userName: string,
    firebaseToken: string
}

interface RequestPayloadDataProp {
    url: string,
    name: string
}

interface GoogleDriveFilesProp {
    kind: string,
    id: string,
    name: string,
    mimeType: string,
    webContentLink: string
}


async function checkProductionServerHealth(monitor: Monitor, hostname: string): Promise<void> {
    try {
        await monitor.checkServerHealth(hostname);

        if (monitor.serverFailedCount === 6) {
            // send the notification
            await Notification.onServerDown();
        }

        if (monitor.serverFailedCount && monitor.serverFailedCount % 3 !== 0) {
            setTimeout(async () => {
                await checkProductionServerHealth(monitor, hostname);
            }, 1000);
        }

        if (monitor.serverFailedCount && monitor.serverFailedCount % 3 === 0) {
            // send an email
            const email = new Email();
            const serverFailedEmailPayload = JSON.stringify(constants.serverFailedEmail);
            const response = await email.sendEmail(serverFailedEmailPayload);
            console.log('response from email', response);
            return;
        }
    } catch (err) {
        console.log('error', err);
    }
}

export class Cron {
    constructor() {
    }

    static async init() {
        try {
            const everydayRunAt7 = new CronOperation('0 0 19 * * *', sendPun);
            everydayRunAt7.init();
            const monitorServerHealth = new CronOperation('*/15 * * * * *', monitorStagingServer);
            monitorServerHealth.init();
        } catch (err) {
            console.log('error', err);
            return err;
        }
    }
}

async function monitorStagingServer() {
    try {
        await checkProductionServerHealth(stagingServerMonitor, config.remote_server_url);
    } catch (err) {
        console.log('error', err);
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


