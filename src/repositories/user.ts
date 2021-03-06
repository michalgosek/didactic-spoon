export interface IUser  {
    uuid: number,
    first_name: string,
    last_name: string,
    email: string,
    gender: string,
    employment: {
        title: string,
        key_skill: string,
    },
    address: {
        city: string,
        street_name: string,
        street_address: string,
        zip_code: string,
        state: string,
        country: string,
    },
}

export interface UserRepository {
    GetAllUsers(): Promise<IUser[]>
    InsertUsers(data : IUser[]): Promise<Boolean>
    GetAllKeySkills(): Promise<String[]>
    GetUsersByState(state : String): Promise<IUser[]>
    GetUsersByCity(city: String): Promise<IUser[]>
}