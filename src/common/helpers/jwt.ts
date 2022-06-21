import jwt, { Secret } from 'jsonwebtoken';

export const generateJWT = (uid: string) => {
    return new Promise((resolve, reject) => {
      const payload = { uid };
      const secret: Secret = 'hola';
      jwt.sign(
        payload,
        secret,
        {
          expiresIn: "4h",
        },
        (err: any, token: any) => {
          if (err) {
            reject('cannot generate token');
          } else {
            resolve(token);
          }
        }
      );
    });
};
