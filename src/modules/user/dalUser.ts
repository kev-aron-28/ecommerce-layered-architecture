import User, { userModel } from './modelUser';
import bcrypt from 'bcryptjs';

class DalUser {
    constructor() {}
    async createUser(user: userModel) {
        const newUser = new User(user);
        await newUser.save()
        return { 
            status: 'success',
            user: newUser
        }
    }

    async loginUser(email: string){
        const userToLogin = await User.findOne({ email });
        if(!userToLogin) {
            return {
                status: 'error',
                msg: 'The user does not exist'
            }
        }

        return { 
            status: 'success',
            user: userToLogin
        };
    }
}

export default DalUser;