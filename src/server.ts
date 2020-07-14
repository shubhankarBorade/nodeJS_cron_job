import express, {Response, Request} from 'express';
import bodyParser from "body-parser";
// @ts-ignore
const app = new express();

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

    app.listen(3000, () => {
        console.log('Server is listening on port 3000');
    });
}

