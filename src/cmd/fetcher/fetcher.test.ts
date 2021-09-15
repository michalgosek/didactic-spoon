import fetcher from './fetcher';


test('positive_should_convert_JSON_user_format_data_to_own_person_type_array', async () => {
    // given:
    const input: any[] = [
        {
            id: 6674,
            uid: 'f72db11b-5e86-440c-bf02-bc92edc00904',
            password: 'qnoAgYtWzF',
            first_name: 'Delila',
            last_name: 'Schmidt',
            username: 'delila.schmidt',
            email: 'delila.schmidt@email.com',
            avatar: 'https://robohash.org/aliquamconsequunturqui.png?size=300x300&set=set1',
            gender: 'Polygender',
            phone_number: '+850 203.609.8283 x75313',
            social_insurance_number: '768849283',
            date_of_birth: '1965-02-05',
            employment: {
                title: 'Internal Consulting Developer',
                key_skill: 'Communication'
            },
            address: {
                city: 'East Karlynton',
                street_name: 'Wolf Road',
                street_address: '602 Cindy Island',
                zip_code: '75160-5801',
                state: 'Florida',
                country: 'United States',
                coordinates: [Object]
            },
            credit_card: { cc_number: '4101692388319' },
            subscription: {
                plan: 'Essential',
                status: 'Pending',
                payment_method: 'Paypal',
                term: 'Annual'
            }
        }
    ]
    // when 
    const got: any[] = await fetcher.convertUsersDataToPersonArray(input);

    // then:
    expect(got.length).toEqual(1);
});