import dalProduct, { productToUpdateFields } from './dalProduct';
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

    async updateProduct(body: any, id: string) {
        const {
            name,
            provider,
            stock,
            price,
            category,
            specifications,
            description
        } = body;

        const productToUpdate: productToUpdateFields = {};

        if(name) productToUpdate.name = name;
        if(provider) productToUpdate.provider = provider;
        if(stock) productToUpdate.stock = stock;
        if(price) productToUpdate.price = price;
        if(category) productToUpdate.category = category;
        if(specifications) productToUpdate.specifications = specifications;
        if(description) productToUpdate.description = description;

        const updatedProduct = await dalProduct.updateProduct(productToUpdate, id);
        return updatedProduct;
    }

    async deleteProduct(id: string) {
        const deletedProduct = await dalProduct.deleteProduct(id);
        return deletedProduct;
    }
    
}

export default productService;