import admin from "firebase-admin";
import config from './config'

const serviceAccount = config.firebase_config || process.env.FIREBASE_CREDENTIALS;

type callback = () => void;

interface firebaseProp {
    init: callback
}

export const firebase: firebaseProp = {
    init: () => {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://capshot.firebaseio.com"
        });
    }
};
