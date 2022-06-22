import { Application } from 'express';
import UserRoutes from './routesUser';
import UserService from './serviceUser';

export abstract class User {
    abstract setUserRoutes(module: any, app: Application):void;
    abstract userService: UserService;
}

class UserSingleton implements User {

    public userService: UserService;
    constructor(){
        this.userService = new UserService();
    }

    setUserRoutes(module: any, app: Application) {
        new UserRoutes(app, module).setUserRoutes();
    }
}

export default new UserSingleton();


