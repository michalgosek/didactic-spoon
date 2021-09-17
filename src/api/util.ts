import { Response } from 'express';

const InternalServerErrorJSON: Object = {
    message: 'InternalServerError'
}

function CreateUserResponseHintJSON(msg: string, hint: string): Object {
    return {
        Message: msg,
        Hint: hint,
    }
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
    CreateUserResponseHintJSON,
    SendJSONResponse,
    InternalServerErrorJSON,
}