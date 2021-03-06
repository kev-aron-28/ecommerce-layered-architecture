import Purchase, { purchaseModel } from './modelPurchase';

class DalUser {

    async getPurchaseById(id: string) {
        const purchaseById = await Purchase.findById(id)
            .populate({ path: 'userId', model: 'user', select: 'firstName' })
            .populate({ path: 'productId', model: 'product', select: 'name'})
        console.log(purchaseById);
        
        return {
            status: 'success',
            purchase: purchaseById
        }
    }

    async createPurchase(purchase: purchaseModel) {
        const createdPurchase = new Purchase(purchase);
        await createdPurchase.save();
        return {
            status: 'success',
            purchase: createdPurchase
        }
    }

    async updatePurchase(status:string , id: string) {
        const updatedPurchase = await Purchase.findByIdAndUpdate(id, { status }, { new: true });
        
        if(!updatedPurchase) {
            return {
                status: 'error',
                msg: 'Could not update the purchase'
            }
        }

        return {
            status: 'success',
            purchase: updatedPurchase
        }
    }

    async deletePurchase(id: string){
        const deletedPurchase = await Purchase.findByIdAndDelete(id);
        return {
            status: 'success',
            purchase: deletedPurchase
        }
    }

    async getPurchaseHistory(id: string) {
        const purchases = await Purchase.find({ userId: id })
            .populate({ path: 'productId', model: 'product', select: 'name'});
        return {
            status: 'success',
            purchases
        }
    }
}

export default new DalUser();

