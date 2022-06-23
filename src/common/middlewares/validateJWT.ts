import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

import UserService from "../../modules/user/serviceUser";
import { SECRETORPRIVATEKEY } from "../constants";



const validateJWT = async (req: any, res: Response, next: NextFunction) => {
   
    const userService = new UserService();
   
    const token = req.header('x-token');

    if (!token) {
      return res.status(401).json({
        msg: 'Invalid access token',
      });
    }
  
    try {
      const tokenId:any = jwt.verify(token, SECRETORPRIVATEKEY);
      
      const { user } = await userService.getUserById(tokenId.uid);
      if(!user) {
          return res.status(401).json({
              msg: 'Could not find the user'
          })
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({
        msg: 'Invalid access token',
      });
    }
}

export default validateJWT;