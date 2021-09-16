import axios from 'axios';
import * as mongo from '../../mongodb/mongodb';
import UserModel, { IUser } from '../../mongodb/schema';
import { config } from "../../config/config";


const app = axios.create({ timeout: config.get().fetcher.timeout }); 

async function fetchUsersBatchFromAPI() {
    console.log('fetching random user data from API started...');
    const promises: any[] = [];

    const n = config.get().fetcher.times;
    const url = config.get().fetcher.url;
  
    for (let i = 0; i < n; i++) {
        console.log(`fetching batch with size attempt no. ${i + 1}`);
        promises.push(app.get(url).then((res: any) => { return res.data }));
    }

    console.log('fetching random user data from API finished...');
    return Promise.all(promises).then((values: any[]) => {
        return values.flat();
    });
}

export async function convertAPIResponseToArray(data: any[]) {
    const users: IUser[] = [];
    data.forEach((u: any) => {
        const single: IUser = new UserModel({
            id: u.id,
            first_name: u.first_name,
            last_name: u.last_name,
            email: u.email,
            gender: u.gender,
            employment: {
                title: u.employment.title,
                key_skill: u.employment.key_skill,
            },
            address: {
                city: u.address.city,
                street_name: u.address.street_name,
                street_address: u.address.street_address,
                zip_code: u.address.zip_code,
                state: u.address.state,
                country: u.address.state,
            },
        })
        users.push(single);
    });
    return users;
}

async function Run() {
    const data = await fetchUsersBatchFromAPI();
    const users = await convertAPIResponseToArray(data);

    const keySkills = new Set();
    users.forEach(u => keySkills.add(u.employment.key_skill));

    mongo.Connect().then(() => {
        UserModel.insertMany(users)
            .then(() => console.log(`Inserted sucessfully ${users.length} documents into the MongoDB.`))
            .catch((err: Error) => console.log("MongoDB insertion err: ", err.message))
            .finally(() => {
                mongo.Disconnect()
                    .catch((err: Error) => console.log("MongoDB disconnect error: ", err.message))
            })
    })
        .catch((err: Error) => console.log("MongoDB Connection error:", err.message));
}

Run();