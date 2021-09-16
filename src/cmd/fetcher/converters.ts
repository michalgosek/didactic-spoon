import User, { IUserDocument } from '../../mongodb/schema';

function convertAPIResponseToArray(data: any[]) {
    const users: IUserDocument[] = [];
    data.forEach((u: any) => {
        const single: IUserDocument = new User({
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

export default  {
    convertAPIResponseToArray
}