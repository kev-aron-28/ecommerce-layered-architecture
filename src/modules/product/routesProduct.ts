import { Application, Request, Response } from 'express';
import { check } from 'express-validator';

import { Product } from '.';
import validateFields from '../../common/middlewares/validateFields';
import validateJWT from '../../common/middlewares/validateJWT';
import validateRole from '../../common/middlewares/validateRole';

class ProductRoutes {
    private app: Application;
    private productModule: Product;
    constructor(app: Application, product: Product) {
        this.app = app;
        this.productModule = product;
    }

    setProductRoutes() {
        this.productRegisterRoute();
        this.productUpdateRoute();
        this.productDeleteRoute();
    }

    productRegisterRoute() {
        this.app.post('/products/register',[
            validateJWT,
            validateRole,
            check('name').not().isEmpty(),
            check('provider').not().isEmpty(),
            check('stock').isInt(),
            check('price').isFloat().not().isEmpty(),
            check('category').isArray(),
            check('specifications').isArray(),
            check('description').not().isEmpty(),
            validateFields
        ], async (req: Request, res: Response) => {
            try {
                const { status, product } = await this.productModule.productService.createProduct(req.body);
                return res.json({ product, status });
            } catch (error) {
                return res.status(500).json({ 
                    status: 'error'
                })
            }
        })
    }

    productUpdateRoute() {
        this.app.put('/products/:id/update',[
            validateJWT,
            validateRole,
            check('id').isMongoId(),
            check('name').optional(),
            check('provider').optional(),
            check('stock').isInt().optional(),
            check('price').isFloat().optional(),
            check('category').isArray().optional(),
            check('specifications').isArray().optional(),
            check('description').optional(),
            validateFields
        ], async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const { status, product } = await this.productModule.productService.updateProduct(req.body, id);
                return res.json({ product, status });
            } catch (error) {
                return res.status(500).json({ 
                    status: 'error'
                })
            }
        })
    }

    productDeleteRoute() {
        this.app.delete('/products/:id/delete',[
            validateJWT,
            validateRole,
            check('id').isMongoId(),
            validateFields
        ], async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const { status, product } = await this.productModule.productService.deleteProduct(id);
                return res.json({ product, status });
            } catch (error) {
                return res.status(500).json({ 
                    status: 'error'
                })
            }
        })
    }
}

export default ProductRoutes;
