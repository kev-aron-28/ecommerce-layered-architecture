import jwt from 'jsonwebtoken';
import { SECRETORPRIVATEKEY } from '../constants';

export const generateJWT = (uid: string) => {
    return new Promise((resolve, reject) => {
      const payload = { uid };
      jwt.sign(
        payload,
        SECRETORPRIVATEKEY,
        {
          expiresIn: "4h",
        },
        (err: any, token: any) => {
          if (err) {
            reject('Cannot generate token');
          } else {
            resolve(token);
          }
        }
      );
    });
};

