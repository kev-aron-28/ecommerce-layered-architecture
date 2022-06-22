import dalProduct from './dalProduct';
import { productModel } from './modelProduct';

class productService {
    async createProduct(body: any) {
        const {
            name,
            provider,
            stock,
            price,
            category,
            specifications,
            description,
        } = body;

        const productToCreate:productModel = {
            name,
            provider,
            stock,
            price,
            category,
            specifications,
            description,
        }

        const createdProduct = await dalProduct.createProduct(productToCreate);
        return createdProduct;
    }

    
}

export default productService;