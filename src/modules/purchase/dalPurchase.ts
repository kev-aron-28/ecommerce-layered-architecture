import Purchase, { purchaseModel } from './modelPurchase';



class DalUser {

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
}

export default new DalUser();
