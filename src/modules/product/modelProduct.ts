import { Schema, model } from 'mongoose';

export interface productModel {
    name: string,
    provider: string,
    stock: Number,
    uid?: string,
    price: Number,
    category: string[],
    specifications: string[],
    description:  string,
};

const productSchema = new Schema<productModel>({
    name: { type: String },
    provider: { type: String },
    stock: { type: Number },
    price: { type: Number },
    category: [{ type: String }],
    specifications: [{ type: String}],
    description: { type: String },
    uid: String
});

productSchema.methods.toJSON = function() {
    const { __v, _id , ...product } = this.toObject();
    product.uid = _id;
    return product;
};

export default model<productModel>('product', productSchema);