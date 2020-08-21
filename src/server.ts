import express, {Response, Request} from 'express';
import bodyParser from "body-parser";
// @ts-ignore
const app = new express();
import config from "./config";

export const server = {
    init: function (): void {
    }
};

server.init = () => {
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());

    app.get('/ping', (req: Request, res: Response) => {
        res.send('pong');
    })

    app.listen(config.port, () => {
        console.log(`Server is listening on port ${config.port}`);
    });
}

