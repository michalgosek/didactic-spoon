import { Request, Response, NextFunction } from 'express';
import { IUser } from '../repositories/user';

interface IUserLister {
    GetAllUsers(): Promise<IUser[]>
}

export const GetAllUsersHandler = (service: IUserLister) => {
    return async (req: Request, res: Response) => {
        try {
            const data = await service.GetAllUsers().catch((err: Error) => { return err });
            return res.status(200).json({
                users: JSON.stringify(data, null, "  ")
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
            const data = await service.GetAllKeySkills().catch((err: Error) => { return err });
            return res.status(200).json({
                skills: JSON.stringify(data, null, "  ")
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
}








