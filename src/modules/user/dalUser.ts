import User, { userModel } from './modelUser';

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

    async getUserById(uid: string){
        const userById = await User.findById(uid);
        if(!userById) {
            return {
                status: 'error',
                msg: 'Could not find user'
            }
        }

        return { 
            user: userById,
            status: 'success'
        }
    }

    async getUserByEmail(email: string) {        
        const userByEmail = await User.findOne({ email });        
        if(!userByEmail) {
            return false
        }
        return true;
    }
}

export default new DalUser();
