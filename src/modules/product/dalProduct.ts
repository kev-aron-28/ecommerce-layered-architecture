import Product, { productModel } from './modelProduct';


export interface productToUpdateFields {
    name?: string,
    provider?: string,
    stock?: Number,
    price?: number,
    category?: string[],
    specifications?: string[],
    description?:  string,
};

class DalProduct {

    async createProduct(product: productModel) {
        const createdProduct = new Product(product);
        await createdProduct.save();
        return {
            status: 'success',
            product: createdProduct
        }   
    }

    async updateProduct(productToUpdate: productToUpdateFields, id: string) {
        const updatedProduct = await Product.findByIdAndUpdate(id, productToUpdate, { new: true });
        if(!updatedProduct) {
            return {
                status: 'error',
                msg: 'Could not update the product'
            }
        }

        return { 
            product: updatedProduct,
            status: 'success'
        }
    }
}

export default new DalProduct();