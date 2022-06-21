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
}

export default DalUser;