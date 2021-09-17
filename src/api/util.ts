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
    res.header("Content-Type", 'application/json');
    try {
        res.status(code);
        res.send(JSON.stringify(data, null, 4));
    } catch (err) {
        console.log("Response parsing error:", err)
        res.status(500);
        res.send(JSON.stringify(InternalServerErrorJSON, null, 4));
    }
}

export default {
    CreateUserResponseHintJSON,
    SendJSONResponse,
    InternalServerErrorJSON,
}