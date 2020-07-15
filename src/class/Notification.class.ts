import assert from "assert";
import util from "util";
import {constants, pun} from '../constants';
import firebaseAdmin from 'firebase-admin';

util.debuglog('notification');

// import {AndroidNotification} from "firebase-admin/lib/messaging";

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

    static getRandomPun(bucket: BucketProp) {
        function getRandomInt(max: number): number {
            return Math.floor(Math.random() * Math.floor(max));
        }

        const randomNumber = getRandomInt(constants.availableBuckets[bucket].length)
        console.log('randomNumber', randomNumber);
        console.log('body', pun[bucket][randomNumber]);
        return pun[bucket][randomNumber];
    }
}