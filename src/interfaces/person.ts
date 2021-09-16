import { Document } from "mongoose";

export default interface IPerson extends Document {
    id: string,
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

export {
    IPerson
}