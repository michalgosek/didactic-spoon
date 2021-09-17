import { IUser } from '../repositories/user';

export interface IUserLister {
    GetAllUsers(): Promise<IUser[]>
}

export interface IKeySkillLister {
    GetAllKeySkills(): Promise<String[]>
}

export interface IUserCountryLister {
    GetUsersByState(state: String): Promise<IUser[]>
}
export interface IUserCityLister {
    GetUsersByCity(city: String): Promise<IUser[]>
}