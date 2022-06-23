import { NextFunction, Response } from "express";

const validateRole = (roleToCheck: string) => (req:any, res:Response, next: NextFunction) => {
    if(!req.user) {
        return res.status(500).json({
            msg: 'Should verify the access token'
        });
    }
    const { role } = req.user;
    if(role !== roleToCheck) {
        return res.status(401).json({
            msg: `You dont have permission to do this action`
        });
    }

    next();
} 

export default validateRole;

