import { Schema, model } from 'mongoose';

export interface purchaseModel {
    userId: Schema.Types.ObjectId,
    productId: Schema.Types.ObjectId,
    purchaseDate: Date,
    actualPrice: string,
    status?: string,
    uid?: string
};

const purchaseModel = new Schema<purchaseModel>({
    userId: { type: Schema.Types.ObjectId, ref: 'user', },
    productId: { type: Schema.Types.ObjectId, ref: 'product', },
    purchaseDate: { type: Date },
    actualPrice: { type: String },
    status: { type: String, default: 'waiting-confirmation' },
    uid: String
});

purchaseModel.methods.toJSON = function() {
    const { __v, _id, ...product } = this.toObject();
    product.uid = _id;
    return product;
}

export default model<purchaseModel>('purchase', purchaseModel);