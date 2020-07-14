import {CronOperation} from "./class/Cron-operations.class";
import {Notification} from "./class/Notification.class";
import {User} from "./class/User.class";

interface UserProp {
    id: number,
    userName: string,
    firebaseToken: string
}

export class Cron {
    constructor() {
    }

    static async init() {
        try {
            const everydayRunAt7 = new CronOperation('*/5 * * * * *', sendPun);
            everydayRunAt7.init();
        } catch (err) {
            console.log('error', err);
            return err;
        }
    }
}

async function sendPun(): Promise<void> {
    // fetch the users who have android version code more than required
    const users: UserProp[] = await User.getUserOfAndroidVersionCode(154);
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
}


