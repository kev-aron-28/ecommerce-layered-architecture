import { Application } from 'express';
import ProductRoutes from './routesProduct';
import ProductService from './serviceProduct';

export abstract class Product {
    abstract setProductRoutes(module: any, app: Application):void;
    abstract productService: ProductService;
}

class ProductSingleton implements Product {
    public productService:ProductService;
    
    constructor() {
        this.productService = new ProductService(); 
    }

    setProductRoutes(module: Product, app: Application) {
        new ProductRoutes(app, module).setProductRoutes();
    }
}

export default new ProductSingleton();

