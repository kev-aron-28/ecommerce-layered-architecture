import UserService from "../../modules/user/serviceUser"

export const userByEmailExists = async (email: string) => {
    const userService = new UserService();
    const isExistingEmail = await userService.getUserByEmail(email)
    console.log(isExistingEmail);
    if (isExistingEmail) {
        throw new Error('The email is already in use');
    }
}
