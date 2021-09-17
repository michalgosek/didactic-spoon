import { Request, Response } from 'express';
import { IUser } from '../repositories/user';
interface IUserLister {
    GetAllUsers(): Promise<IUser[]>
}

export const GetAllUsersHandler = (service: IUserLister) => {
    return async (req: Request, res: Response) => {
        try {
            const data = await service.GetAllUsers();
            SendJSONResponse(res, data, 200);
        } catch (err) {
            SendJSONResponse(res, InternalServerErrorJSON, 500);
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
            SendJSONResponse(res, data, 200);
        } catch (err) {
            SendJSONResponse(res, InternalServerErrorJSON, 500);
        }
    };
};

interface IUserCountryLister {
    GetUsersByState(state: String): Promise<IUser[]>
}

export const GetUsersByState = (service: IUserCountryLister) => {
    return async (req: Request, res: Response) => {
        try {
            const state: string = req.body.name;
            if (state.length == 0) {
                const url: string = `curl localhost:6060/v1/users/states -d '{"name":"New Hampshire"}' -H "Content-Type: application/json"`;
                const msg: string = "Provide name in the rquest body"
                const hint: Object = CreateUserResponseHintJSON(msg, url)
                SendJSONResponse(res, hint, 500);
            }
            const data = await service.GetUsersByState(state);
            SendJSONResponse(res, data, 200);
        } catch (err) {
            console.log("GetUsersByState Op failed.")
            console.log("Reason:", err)
            SendJSONResponse(res, InternalServerErrorJSON, 500);
        }
    };
};


function CreateUserResponseHintJSON(msg: string, hint: string): Object {
    return {
        Message: msg,
        Hint: hint,
    }
}

const InternalServerErrorJSON: Object = {
    message: 'InternalServerError'
}

function SendJSONResponse(res: Response, data: any, code: number) {
    try {
        res.header("Content-Type", 'application/json');
        res.status(code);
        res.send(JSON.stringify(data, null, 4));
    } catch (err) {
        console.log("Response parsing error:", err)
        res.header("Content-Type", 'application/json');
        res.status(code);
        res.send(JSON.stringify(InternalServerErrorJSON, null, 4));
    }
}


export default {
    GetAllUsersHandler,
    GetAllKeySkill,
    GetUsersByState,
}