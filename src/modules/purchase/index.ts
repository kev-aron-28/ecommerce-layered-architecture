import { Application } from 'express';
import PurchaseRoutes from './routesPurchase';
import PurchaseService from './servicePurchase';

export abstract class Purchase {
    abstract setPurchaseRoutes(module: any, app: Application):void;
    abstract purchaseService: PurchaseService;
}

class PurchaseSingleton implements Purchase{
    
    public purchaseService: PurchaseService;
    constructor(){
        this.purchaseService = new PurchaseService();
    }

    setPurchaseRoutes(module: Purchase, app: Application) {
        new PurchaseRoutes(app, module).setPurchaseRoutes();
    }

}

export default new PurchaseSingleton();
