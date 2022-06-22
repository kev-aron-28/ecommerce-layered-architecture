import express, {Application} from 'express';
import cors from 'cors';

import RoutesSingleton from './routes';
import Database from './config/database';

class Server {
    private app: Application;
    private port: String;
    private db: Database;
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.db = new Database();
        
        this.middlewares();
        this.routes();
        this.database();
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
        RoutesSingleton.init(this.app);
    }

    async database() {
        await this.db.connect()
    }
}

export default Server;
