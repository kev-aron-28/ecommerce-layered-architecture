import { Application } from 'express'
import UserSingleton from './modules/user';
import ProductSingleton from './modules/product';

class RoutesSingleton {
    
    init(app: Application) {
        UserSingleton.setUserRoutes(UserSingleton, app);  
        ProductSingleton.setProductRoutes(ProductSingleton, app);
    }
}

export default new RoutesSingleton();
