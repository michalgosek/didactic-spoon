import { IUser, UserRepository } from '../repositories/user'

type UserDependecies = {
    usersRepository: UserRepository
}

export const userService = (dependecies: UserDependecies) => {
    const getAllUsers = async (): Promise<IUser[]> => {
        return await dependecies.usersRepository.GetAllUsers().then((users: IUser[]) => {
            return users
        });
    };
    return {
        getAllUsers,
    };
}


