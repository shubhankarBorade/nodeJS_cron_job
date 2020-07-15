import {firebase} from "./firebase-config";
import {postgres} from "./postgresql-config";
import {server} from "./server";
import {Cron} from "./cron";

firebase.init();
server.init();
postgres.init();
Cron.init().then();
