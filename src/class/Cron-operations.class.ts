import {CronJob} from "cron";
type callback = () => void;

export class CronOperation extends CronJob {

    constructor(public cronTime: string, public job: callback) {
        super(cronTime, job);
    }

    init(onComplete?: callback | null, shouldStartNow: boolean = true, timeZone: string = 'Asia/Kolkata'): void {
        const job = new CronJob(this.cronTime, this.job, onComplete, shouldStartNow, timeZone);
        return job.start();
    };


}