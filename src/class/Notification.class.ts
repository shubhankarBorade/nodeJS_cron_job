import assert from "assert";
import util from "util";
import {constants, pun} from '../constants';
import firebaseAdmin from 'firebase-admin';
import {User} from "./User.class";
import {UserProp} from "../interfaces";

util.debuglog('notification');

interface NotificationDataProp {
    title: string,
    body: string,
    intent: string
}

type notificationPriority = 'normal' | 'high';

interface NotificationMessageProp {
    data: {},
    android: {
        priority: notificationPriority,
        collapseKey: string,
    },
    apns: {
        payload: {
            "aps": {
                "alert": {
                    "title": string
                    "body": string
                }
            }
        }
    },
    token: string
}

type BucketProp = 'indians' | 'internationals';

export class Notification {
    private readonly firebaseToken: string;

    /**
     *
     * @param {string} firebaseToken
     */
    constructor(firebaseToken: string) {
        this.firebaseToken = firebaseToken;
    }

    /**
     *
     * @param {{title : string, body : string}} data
     * @param {string} [priority]
     */
    async sendNotification(data: NotificationDataProp, priority: notificationPriority = 'normal'): Promise<boolean> {
        return new Promise(async (resolve) => {
            try {
                const {title, body} = data;
                assert(title, 'Missing title');
                assert(body, 'Missing body');
                const message: NotificationMessageProp = {
                    data: data,
                    android: {
                        priority: priority,
                        collapseKey: "1"
                    },
                    apns: {
                        payload: {
                            "aps": {
                                "alert": {
                                    "title": title,
                                    "body": body
                                }
                            }
                        }
                    },
                    token: this.firebaseToken
                };
                // Send a message to the device corresponding to the provided
                // registration token.
                console.log("Message", message);
                // @ts-ignore
                const response = await firebaseAdmin.messaging().send(message);
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
                return resolve(true);
            } catch (err) {
                console.log('error', err);
                return resolve(false);
            }
        })
    }

    static async onServerDown(): Promise<void> {
        try {
            // fetch the users who have android version code more than required
            const users: UserProp[] = await User.getUserOfAndroidVersionCode(153);

            for (let user of users) {
                const firebaseToken = user.firebaseToken;
                const notificationBody = `Hey ${user.userName}. It’s clear that spreading laughter requires work. Bear with us while we undergo some routine maintenance. We promise the wait will be worth it ;)`;
                const notification = new Notification(firebaseToken);
                await notification.sendNotification({
                    title: 'Server Maintenance 🛠',
                    body: notificationBody,
                    intent: 'notify'
                })
            }
        } catch (err) {
            console.log('error', err);
        }
    }

    static getRandomPun(bucket: BucketProp) {
        function getRandomInt(max: number): number {
            return Math.floor(Math.random() * Math.floor(max));
        }

        const randomNumber = getRandomInt(constants.availableBuckets[bucket].length)
        return pun[bucket][randomNumber];
    }
}