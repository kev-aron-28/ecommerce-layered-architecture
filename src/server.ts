import express, {Application} from 'express';
import cors from 'cors';

class Server {
    private app: Application;
    private port: String;
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.middlewares();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ' +  this.port);
        })
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {

    }
}

export default Server;