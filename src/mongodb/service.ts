import { UserRepository, IUser } from "../repositories//user";
import User, { IUserDocument } from '../mongodb/schema';
import { config } from "../config/config";
import mongoose from 'mongoose';

const options = {
    autoIndex: false, // Don't build indexes
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect(config.get().db.host, options).then(result => {
    console.info("Mongoose client successfully connected...");
    console.log("Loaded config: ", config.get().db)
}).catch((err: Error) => {
    console.error("There was an error during Mongoose connection");
    console.error("Reason:", err.message);
    return err;
});

export async function DisconnectDataSource() {
    mongoose.disconnect()
        .then(() => {
            console.info("Mongoose client successfully disconnected...");
        })
        .catch((err: Error) => {
            console.error("There was an error during Mongoose disconnection");
            console.error("Reason:", err.message);
            return err;
        });
}

export const MongoDB: UserRepository = {
    InsertUsers: function (data: IUser[]): Promise<Boolean> {
        return User.insertMany(data).then(() => {
            console.log(`Inserted sucessfully ${data.length} documents.`);
            return true;
        })
            .catch((err: Error) => {
                console.log("There was an error druing users insertion");
                console.log(err);
                return false;
            });
    },
    GetAllUsers: async function (): Promise<IUser[]> {
        let users: IUser[] = [];
        await User.find().exec().then((docs: IUserDocument[]) => {
            users = convertUserDocumentsToIUserArray(docs);
        });
        return users;
    },
    GetAllKeySkills: async function (): Promise<String[]> {
        let skills: String[] = [];
        await User.find().exec().then((users: IUserDocument[]) => {
            skills = users.map((u: IUserDocument) => { return u.employment.key_skill; });
        });
        return skills;
    },

    GetUsersByState: async function (state: String): Promise<IUser[]> {
        let users: IUser[] = [];
        await User.find({ "address.state": state })
            .exec()
            .then((docs: IUserDocument[]) => {
                users = convertUserDocumentsToIUserArray(docs);
            });
        return users;
    },
    GetUsersByCity: async function (city: String): Promise<IUser[]> {
        let users: IUser[] = [];
        await User.find({ "address.city": city })
            .exec()
            .then((docs: IUserDocument[]) => {
                users = convertUserDocumentsToIUserArray(docs);
            });
        return users;
    }
};

function convertUserDocumentsToIUserArray(docs: IUserDocument[]): IUser[] {
    const users: IUser[] = [];
    docs.forEach((user: IUserDocument) => {
        const converted: IUser = {
            uuid: user.uuid,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            gender: user.gender,
            employment: {
                title: user.employment.title,
                key_skill: user.employment.key_skill,
            },
            address: {
                city: user.address.city,
                street_name: user.address.street_name,
                street_address: user.address.street_address,
                zip_code: user.address.zip_code,
                state: user.address.state,
                country: user.address.country,
            },
        };
        users.push(converted);
    });
    return users;
}
