import { Request, Response } from 'express';
import util from '../api/util';
import {IUserLister, IKeySkillLister, IUserCountryLister, IUserCityLister} from '../api/api';

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
                const url: string = `curl localhost:6060/v1/users/state -d '{"name":"New Hampshire"}' -H "Content-Type: application/json"`;
                const msg: string = "Provide name in the request body"
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


export const GetUsersByCity = (service: IUserCityLister) => {
    return async (req: Request, res: Response) => {
        try {
            const city: string = req.body.name;
            if (city.length == 0) {
                const url: string = `curl localhost:6060/v1/users/city -d '{"name":"South Philomena"}' -H "Content-Type: application/json"`;
                const msg: string = "Provide city name in the request body"
                const hint: Object = util.CreateUserResponseHintJSON(msg, url)
                util.SendJSONResponse(res, hint, 500);
            }
            const data = await service.GetUsersByCity(city);
            util.SendJSONResponse(res, data, 200);
        } catch (err) {
            console.log("GetUsersByCity Op failed.")
            console.log("Reason:", err)
            util.SendJSONResponse(res, util.InternalServerErrorJSON, 500);
        }
    };
};


export default {
    GetAllUsersHandler,
    GetAllKeySkill,
    GetUsersByState,
    GetUsersByCity
}