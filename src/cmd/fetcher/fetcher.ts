import axios from 'axios';
import { Person } from './types';
 
const app = axios.create({ timeout: 50000 }); // 5s 

async function fetchUsersData(n: Number, size: Number) {
    console.log('fetching random user data from API started...');
    const promises: any[] = [];

    for (let i = 0; i < n; i++) {
        console.log(`fetching batch with size ${size} no ${i + 1}`);
        promises.push(app.get(`https://random-data-api.com/api/users/random_user?size=${size}`).then((res: any) => { return res.data }));
    }

    console.log('fetching random user data from API finished...');
    return Promise.all(promises).then((values: any[]) => {
        return values.flat();
    });
}

export async function convertUsersDataToPersonArray(data: any[]) {
    const users : Person[] = [];
    data.forEach(u => {  
        const person : Person = {
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
        }
        users.push(person);
    });
    return users; 
}

async function FetchDataFromAPI() {
    const data = await fetchUsersData(1, 1);
    const users = await convertUsersDataToPersonArray(data);
    const keySkills = new Set();
    users.forEach(u => keySkills.add(u.employment.key_skill));
}

FetchDataFromAPI();