import axios from 'axios';
import converters from './converters';
import { IUserDocument } from '../../mongodb/schema';
import { MongoDB, DisconnectDataSource } from '../../mongodb/service';
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

async function Run() {
    fetchUsersBatchFromAPI().then((data) => {
        const usersArray: IUserDocument[] = converters.convertAPIResponseToArray(data)
        const keySkills = new Set();
        usersArray.forEach(u => keySkills.add(u.employment.key_skill));
        
        MongoDB.InsertUsers(usersArray)
            .then(() => {
                DisconnectDataSource().catch((err: Error) => {
                    console.log('DisconnectDataSource failed');
                    console.log('Reason: ', err.message);
                })
            })
            .catch((err: Error) => {
                console.log("InsertUsers failed");
                console.log("Reason:", err.message)
                return err;
            })
            .catch((err: Error) => {
                console.log("convertAPIResponseToArray failed");
                console.log("Reason:", err.message)
            })
    }).catch((err: Error) => {
        console.log("fetchUsersBatchFromAPI failed");
        console.log("Reason:", err.message)
    })
}

Run();
