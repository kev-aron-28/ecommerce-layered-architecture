import Product, { productModel } from './modelProduct';


class DalProduct {

    async createProduct(product: productModel) {
        const createdProduct = new Product(product);
        await createdProduct.save();
        return {
            status: 'success',
            product: createdProduct
        }   
    }
}

export default new DalProduct();