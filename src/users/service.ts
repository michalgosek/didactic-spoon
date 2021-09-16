import { IUser, UserRepository } from '../repositories/user'

export type UserDependecies = {
    usersRepository: UserRepository
}

export const UserService = (dependecies: UserDependecies) => {
    const GetAllUsers = async (): Promise<IUser[]> => { return await dependecies.usersRepository.GetAllUsers().then((users: IUser[]) => { return users; }) };
    const InsertUsers = async (users: IUser[]): Promise<Boolean> => { return false; };
    const GetAllKeySkills = async (): Promise<String[]> => { return await dependecies.usersRepository.GetAllKeySkills().then((skills: String[]) => { return skills; }) };
    const GetUsersByState = async (state: String): Promise<IUser[]> => {
        // here we can implement validation and follow fast failing approach 
        const users: IUser[] = [];
        if (state.length == 0) {
            return users;
        }
        return await dependecies.usersRepository.GetUsersByState(state).then((users: IUser[]) => users);
    }
    return {
        GetAllUsers,
        InsertUsers,
        GetAllKeySkills,
        GetUsersByState
    };
}


