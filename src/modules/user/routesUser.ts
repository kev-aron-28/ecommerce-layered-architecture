import { Application } from "express";
import UserSingleton from "./";

class UserRoutes {
    private app: Application;
    private User: UserSingleton;
    constructor(app: Application, user: any) {
        this.app = app;
        this.User = user;
    }

    userRoutes() {
        this.app.post('/users', async (req, res) => {
            try { 
                const createdUser = await this.User.userService.createUser(req.body);    
                return res.json({
                    user: createdUser
                }) 
            }  catch(error) {
                return res.status(400).json({
                    success: 'false',
                })
            }
        })
    }
}

export default UserRoutes;