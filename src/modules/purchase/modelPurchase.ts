import { Schema, model } from 'mongoose';

export interface purchaseModel {
    userId: string,
    productId: string,
    purchaseDate: Date,
    actualPrice: Number,
    status?: string,
    uid?: string
};

const purchaseModel = new Schema<purchaseModel>({
    userId: { type: String },
    productId: { type: String },
    purchaseDate: { type: Date },
    actualPrice: { type: Number },
    status: { type: String, default: 'waiting-confirmation' },
    uid: String
});

purchaseModel.methods.toJSON = function() {
    const { __v, _id, ...product } = this.toObject();
    product.uid = _id;
    return product;
}

export default model<purchaseModel>('purchase', purchaseModel);