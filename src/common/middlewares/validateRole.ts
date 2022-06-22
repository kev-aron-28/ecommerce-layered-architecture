import { NextFunction, Response } from "express";

const validateRole = (req:any, res:Response, next: NextFunction) => {
    if(!req.user) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token'
        });
    }
    const { role } = req.user;
    if(role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `You dont have permission to create a product`
        })
    }

    next();
}   

export default validateRole;

