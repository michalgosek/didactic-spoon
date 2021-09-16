import { IUser, UserRepository } from '../repositories/user'

export type UserDependecies = {
    usersRepository: UserRepository
}

export const UserService = (dependecies: UserDependecies) => {
    const GetAllUsers = async (): Promise<IUser[]> => { return await dependecies.usersRepository.GetAllUsers().then((users: IUser[]) => { return users }) };
    const InsertUsers = async (users: IUser[]): Promise<Boolean> => { return false };
    const GetAllKeySkills = async () : Promise<String[]> => { return await dependecies.usersRepository.GetAllKeySkills().then((skills: String[]) => { return skills }) }
    return {
        GetAllUsers,
        InsertUsers,
        GetAllKeySkills
    };
}


