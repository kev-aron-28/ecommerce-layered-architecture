import { Application } from 'express';
import UserRoutes from './routesUser';
import UserService from './serviceUser';


class UserSingleton {

    public userService: UserService;
    constructor(private app: Application){
        this.userService = new UserService();
    }

    setUserRoutes(module: any) {
        new UserRoutes(this.app, module).userRoutes();
    }
}

export default UserSingleton;

