import dalPurchase from "./dalPurchase";
import { purchaseModel } from "./modelPurchase";

class PurchaseService {


    async getPurchaseById(id:string) {
        const purchaseById = await dalPurchase.getPurchaseById(id);
        return purchaseById;
    }

    async createPurchase(body: any) {
        const {
            userId,
            productId,
            purchaseDate,
            actualPrice
        } = body;
        const purchaseToCreate:purchaseModel = { userId, productId, purchaseDate, actualPrice };        
        const createdPurchase = await dalPurchase.createPurchase(purchaseToCreate);
        
        return createdPurchase;
    }

    async updatePurchase(body: any, id: string) {
        const {
            status
        } = body;
        const updatedPurchase = await dalPurchase.updatePurchase(status, id);
        return updatedPurchase;
    }

    async deletePurchase(id: string) {
        const deletedPurchase = await dalPurchase.deletePurchase(id);
        return deletedPurchase;
    }
}

export default PurchaseService;