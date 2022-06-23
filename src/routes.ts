import { Application } from 'express'
import UserSingleton from './modules/user';
import ProductSingleton from './modules/product';
import PurchaseSingleton from './modules/purchase';

class RoutesSingleton {
    
    init(app: Application) {
        UserSingleton.setUserRoutes(UserSingleton, app);  
        ProductSingleton.setProductRoutes(ProductSingleton, app);
        PurchaseSingleton.setPurchaseRoutes(PurchaseSingleton, app);
    }
}

export default new RoutesSingleton();
