import { Application, Request, Response } from 'express';
import { check } from 'express-validator';
import ValidateFields from '../../common/middlewares/validateFields';
import UserSingleton from './';

class UserRoutes {
    private app: Application;
    private User: UserSingleton;
    constructor(app: Application, user: UserSingleton) {
        this.app = app;
        this.User = user;
    }

    userRoutes() {
        this.app.post('/users/register', [
            check('firstName').not().isEmpty(),
            check('lastName').not().isEmpty(),
            check('birthDate').not().isEmpty(),
            check('phone').isMobilePhone('any'),
            check('adress').not().isEmpty(),
            check('email').isEmail(),
            check('password').not().isEmpty(),
            check('role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
            ValidateFields
        ], async (req: Request, res: Response) => {
            try { 
                const { user, status } = await this.User.userService.createUser(req.body);    
                return res.json({ user, status }); 
            }  catch(error) {
                return res.status(500).json({
                    status: 'error'
                })
            }
        })

        this.app.post('/users/login', async (req: Request, res: Response) => {
            try {
                const { token, user } = await this.User.userService.loginUser(req.body);
                return res.json({ 
                    token,
                    user
                })
            } catch (error) {
                return res.status(500).json({
                    status: 'error'
                })
            }
        })
    }
}

export default UserRoutes;