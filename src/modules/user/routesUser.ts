import { Application, Request, Response } from 'express';
import { check } from 'express-validator';
import ValidateFields from '../../common/middlewares/validateFields';
import UserSingleton, { User } from './';

class UserRoutes {
    private app: Application;
    private userModule: User;
    constructor(app: Application, user: User) {
        this.app = app;
        this.userModule = user;
    }

    setUserRoutes() {
        this.userRegisterRoute();
        this.userLoginRoute();
        this.userByIdRoute()
    }

    userRegisterRoute() {
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
                const { user, status } = await this.userModule.userService.createUser(req.body);    
                return res.json({ user, status }); 
            }  catch(error) {
                return res.status(500).json({
                    status: 'error'
                })
            }
        })
    }

    userLoginRoute() {
        this.app.post('/users/login',[
            check('email').isEmail(),
            check('password').not().isEmpty(),
            ValidateFields
        ], async (req: Request, res: Response) => {
            try {
                const { token, user } = await this.userModule.userService.loginUser(req.body);
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

    userByIdRoute() {
        this.app.get('/users/:id', [
            check('id').isMongoId(),
            ValidateFields
        ], async (req: Request, res: Response) => {
            try { 
                const { user, status } = await this.userModule.userService.getUserById(req.params.id);    
                return res.json({ user, status }); 
            }  catch(error) {
                return res.status(500).json({
                    status: 'error'
                })
            }
        })
    }
}

export default UserRoutes;
