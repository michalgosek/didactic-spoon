import mongoose, { Schema } from 'mongoose';

export interface IUserDocument extends Document {
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

const UserSchema: Schema = new Schema(
    {
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
        collection: 'users',
    }
);

export default mongoose.model<IUserDocument>('User', UserSchema);