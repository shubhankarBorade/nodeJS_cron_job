import {firebase} from "./firebase-config";
import {postgres} from "./postgresql-config";
import {server} from "./server";

firebase.init();
server.init();
postgres.init();
// Cron.init().then();

console.log('google cred', process.env);
