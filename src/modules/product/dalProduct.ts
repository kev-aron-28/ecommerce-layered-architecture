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

    async deleteProduct(id: string) {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if(!deletedProduct) {
            return { 
                status: 'error',
                msg: 'Could not delete the product'
            }
        }

        return { 
            product: deletedProduct,
            status: 'success'
     
       }
    }

    async searchProduct(term: string) {
        const regexTerm = new RegExp(term, 'i');
        const products = await Product.find({ 
            $or: [
                { 'name': regexTerm },
                { 'provider': regexTerm },
                { 'description': regexTerm },
                { 'price': regexTerm },
                { 'stock': regexTerm}
            ]
        })

        return { 
            products: products? products : [],
            status: 'success'
        }
    }
}

export default new DalProduct();