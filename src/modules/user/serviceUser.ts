import DalUser from './dalUser';
import { userModel } from './modelUser';

class userService {
    private dalUser: DalUser;
    constructor() {
        this.dalUser = new DalUser();
    }

    async createUser(body: any) {
        const { 
            firstName,
            lastName,
            birthDate,
            phone,
            email,
            password,
            adress
        } = body;

        const userToCreate: userModel = {
            firstName,
            lastName,
            birthDate,
            phone,
            email,
            password,
            adress
        }
        const createdUser = await this.dalUser.createUser(userToCreate);
        return createdUser;
    }
}

export default userService;