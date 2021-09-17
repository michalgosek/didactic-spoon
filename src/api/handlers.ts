import { Request, Response } from 'express';
import { IUser } from '../repositories/user';
interface IUserLister {
    GetAllUsers(): Promise<IUser[]>
}

export const GetAllUsersHandler = (service: IUserLister) => {
    return async (req: Request, res: Response) => {
        try {
            const data = await service.GetAllUsers();
            return res.status(200).json({
                users: data
            });
        } catch (err) {
            return res.status(500).json({
                message: 'InternalServerError'
            });
        }
    };
};

interface IKeySkillLister {
    GetAllKeySkills(): Promise<String[]>
}

export const GetAllKeySkill = (service: IKeySkillLister) => {
    return async (req: Request, res: Response) => {
        try {
            const data = await service.GetAllKeySkills();
            return res.status(200).json({
                skills: data
            });
        } catch (err) {
            return res.status(500).json({
                message: 'InternalServerError'
            });
        }
    };
};

interface IUserCountryLister {
    GetUsersByState(state : String): Promise<IUser[]>
}

export const GetUsersByState = (service: IUserCountryLister) => {
    return async (req: Request, res: Response) => {
        try {
            const state: String = req.body.name; 
            if (state.length == 0) {
                return res.status(500).json({
                    Error: 'Provide state name query value was undefined',
                    ExampleCURL: `curl localhost:6060/v1/users/states -d '{"name":"New Hampshire"}' -H "Content-Type: application/json"`
                });
            }
            const data = await service.GetUsersByState(state);
            return res.status(200).json({
                users: data
            });
        } catch (err) {
            return res.status(500).json({
                message: 'InternalServerError'
            });
        }
    };
};

export default {
    GetAllUsersHandler,
    GetAllKeySkill,
    GetUsersByState, 
}