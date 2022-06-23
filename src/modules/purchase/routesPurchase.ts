import { Application, Request, Response } from 'express';
import { check } from 'express-validator';
import { Purchase } from '.';
import validateFields from '../../common/middlewares/validateFields';
import validateJWT from '../../common/middlewares/validateJWT';
import validateRole from '../../common/middlewares/validateRole';
// check('status').isIn([
//     'waiting-confirmation', 
//     'order-on-process', 
//     'package-on-delivery',
//     'package-delivered',
        ''
// ]),



class PurchaseRoutes {
    private app: Application;
    private purchaseModule: Purchase;
    constructor(app: Application, purchase: Purchase) {
        this.app = app;
        this.purchaseModule = purchase;
    }

    setPurchaseRoutes() {
        this.purchaseRegisterRoute();
        this.purchaseUpdateRoute();
        this.purchaseDeleteRoute();
    }

    purchaseRegisterRoute() {
        this.app.post('/purchase/register',[
            validateJWT,
            validateRole('USER_ROLE'),
            check('userId').isMongoId(),
            check('productId').isMongoId(),
            check('purchaseDate').not().isEmpty(),
            check('actualPrice').isFloat(),
            validateFields
        ],async (req: Request, res: Response) => {
            try {
                const { status, purchase } = await this.purchaseModule.purchaseService.createPurchase(req.body);
                return res.json({ purchase, status });
            } catch (error) {
                return res.status(500).json({
                    status: 'error'
                })
            }
        });
    }

    purchaseUpdateRoute() {
        this.app.put('/purchase/:id/update',[
            validateJWT,
            validateRole('ADMIN_ROLE'),
            check('id').isMongoId(),
            check('status').isIn([
                'waiting-confirmation', 
                'order-on-process', 
                'package-on-delivery',
                'package-delivered',
             ]),
        ], async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const { purchase, status } = await this.purchaseModule.purchaseService.updatePurchase(req.body, id);
                return res.json({
                    purchase,
                    status
                })
            } catch (error) {
                return res.status(500).json({
                    status: 'error'
                })
            }
        })   
    }

    purchaseDeleteRoute() {
        this.app.delete('/purchase/:id/delete',[
            validateJWT,
            validateRole('USER_ROLE'),
            check('id').isMongoId(),
        ], async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const { purchase, status } = await this.purchaseModule.purchaseService.deletePurchase(id);
                return res.json({ purchase, status }); 
            } catch (error) {
                return res.status(500).json({
                    status: 'error'
                })
            }
        })
    }

}

export default PurchaseRoutes;