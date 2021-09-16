import moongose, { Schema } from 'mongoose';
import IPerson from '../interfaces/person';

const PersonSchema: Schema = new Schema(
    {
        id: { type: String, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true },
        gender: { type: String, required: true },
        employment: {
            title: { type: String, required: true },
            key_skill: { type: String, required: true },
        },
        address: {
            city: { type: String, required: true },
            street_name: { type: String, required: true },
            street_address: { type: String, required: true },
            zip_code: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
        }
    },
    {
        timestamps: true,
    }
);

export default moongose.model<IPerson>('Person', PersonSchema);