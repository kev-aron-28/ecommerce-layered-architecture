import DalUser from './dalUser';
import { userModel } from './modelUser';
import bcrypt from 'bcryptjs';
import { generateJWT } from '../../common/helpers/jwt';

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
            adress,
            role
        } = body;

        const userToCreate: userModel = {
            firstName,
            lastName,
            birthDate,
            phone,
            email,
            password,
            adress,
            role
        }

        const salt = bcrypt.genSaltSync();
        userToCreate.password = bcrypt.hashSync(userToCreate.password, salt);

        const createdUser = await this.dalUser.createUser(userToCreate);
        return createdUser;
    }

    async loginUser(body: any){
        const { email, password } = body;
        const { status, user, msg } = await this.dalUser.loginUser(email);
        const userToLogin: any = user;
        const isValidPassword = bcrypt.compareSync(password, userToLogin.password);
        
        if(!isValidPassword) {
            return {
                status: 'error',
                msg: 'Invalid password or email'
            }
        }

        const token = await generateJWT(userToLogin.uid);

        return { 
            token,
            user: userToLogin
        }

    }

    
}

export default userService;