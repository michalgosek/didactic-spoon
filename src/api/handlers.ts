import { Request, Response } from 'express';
import util from '../api/util';
import {IUserLister, IKeySkillLister, IUserCountryLister} from '../api/api';

export const GetAllUsersHandler = (service: IUserLister) => {
    return async (_req: Request, res: Response) => {
        try {
            const data = await service.GetAllUsers();
            util.SendJSONResponse(res, data, 200);
        } catch (err) {
            util.SendJSONResponse(res, util.InternalServerErrorJSON, 500);
        }
    };
};

export const GetAllKeySkill = (service: IKeySkillLister) => {
    return async (_req: Request, res: Response) => {
        try {
            const data = await service.GetAllKeySkills();
            util.SendJSONResponse(res, data, 200);
        } catch (err) {
            util.SendJSONResponse(res, util.InternalServerErrorJSON, 500);
        }
    };
};

export const GetUsersByState = (service: IUserCountryLister) => {
    return async (req: Request, res: Response) => {
        try {
            const state: string = req.body.name;
            if (state.length == 0) {
                const url: string = `curl localhost:6060/v1/users/states -d '{"name":"New Hampshire"}' -H "Content-Type: application/json"`;
                const msg: string = "Provide name in the rquest body"
                const hint: Object = util.CreateUserResponseHintJSON(msg, url)
                util.SendJSONResponse(res, hint, 500);
            }
            const data = await service.GetUsersByState(state);
            util.SendJSONResponse(res, data, 200);
        } catch (err) {
            console.log("GetUsersByState Op failed.")
            console.log("Reason:", err)
            util.SendJSONResponse(res, util.InternalServerErrorJSON, 500);
        }
    };
};

export default {
    GetAllUsersHandler,
    GetAllKeySkill,
    GetUsersByState,
}