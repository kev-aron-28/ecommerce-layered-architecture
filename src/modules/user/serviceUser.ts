import dalUser from './dalUser';
import { userModel } from './modelUser';
import bcrypt from 'bcryptjs';
import { generateJWT } from '../../common/helpers/jwt';

class userService {
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

        const createdUser = await dalUser.createUser(userToCreate);
        return createdUser;
    }

    async loginUser(body: any){
        const { email, password } = body;
        const { status, user, msg } = await dalUser.loginUser(email);
        const userToLogin: any = user;
        const isValidPassword = bcrypt.compareSync(password, userToLogin.password);
        
        if(!isValidPassword) {
            return {
                status: 'error',
                msg: 'Invalid password or email'
            }
        }

        const token = await generateJWT(userToLogin._id);

        return { 
            token,
            user: userToLogin
        }

    }

    async getUserById(id: string) {
        const userById = await dalUser.getUserById(id);
        return userById;
    }

    
}

export default userService;