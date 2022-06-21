import { Application } from 'express'
import UserSingleton from './modules/user';

class RoutesSingleton {
    
    private User;
    constructor(private app: Application) {
        this.User = new UserSingleton(this.app);
    }

    setRoutes() {
        new UserSingleton(this.app).setUserRoutes(this.User);            
    }
}

export default RoutesSingleton;