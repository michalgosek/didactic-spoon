# didactic-spoon

# Before running

1. Start the mongodb docker container and pass the config credetnails into /src/config/config-development.json file. By default MongoDB cli connects with localhost and port 27017
1. Run `npm run fetcher` command for fetching custom
data from https://random-data-api.com/api/users/ API. 
2. When fetch data was succesfull then run `npm run dev` to start the service.

Example output after fetching the data:
```
fetching random user data from API started...
fetching batch with size attempt no. 1
fetching batch with size attempt no. 2
fetching batch with size attempt no. 3
fetching batch with size attempt no. 4
fetching batch with size attempt no. 5
fetching batch with size attempt no. 6
fetching batch with size attempt no. 7
fetching batch with size attempt no. 8
fetching batch with size attempt no. 9
fetching batch with size attempt no. 10
fetching random user data from API finished...
Mongoose client successfully connected...
Loaded config:  { host: 'mongodb://localhost:27017/mydb', name: 'mydb' }
Inserted sucessfully 1000 documents.
Mongoose client successfully disconnected...
```

Example output after starting the service in dev mode:
```
[nodemon] 2.0.12
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node src/http/server.ts`
The server is running on port 6060
Mongoose client successfully connected...
Loaded config:  { host: 'mongodb://localhost:27017/mydb', name: 'mydb' }
```

# Endpoints:
## Listing all users:


Name query parameter is required.
Example:
```curl
 curl localhost:6060/v1/users
```

Expected output:
```json
[
    {
        "uuid": 3970,
        "first_name": "Rhiannon",
        "last_name": "Stanton",
        "email": "rhiannon.stanton@email.com",
        "gender": "Male",
        "employment": {
            "title": "Global IT Manager",
            "key_skill": "Networking skills"
        },
        "address": {
            "city": "Port Litamouth",
            "street_name": "Becker Circles",
            "street_address": "527 Lee Views",
            "zip_code": "30606",
            "state": "Connecticut",
            "country": "United States"
        }
    },
    {
        "uuid": 7146,
        "first_name": "Basil",
        "last_name": "Denesik",
        "email": "basil.denesik@email.com",
        "gender": "Male",
        "employment": {
            "title": "Chief Retail Coordinator",
            "key_skill": "Teamwork"
        },
        "address": {
            "city": "Ryanland",
            "street_name": "Edwin Road",
            "street_address": "14688 O'Connell Bridge",
            "zip_code": "28893-2544",
            "state": "Illinois",
            "country": "United States"
        }
    },
    {
        "uuid": 4959,
        "first_name": "Bailey",
        "last_name": "Marks",
        "email": "bailey.marks@email.com",
        "gender": "Non-binary",
        "employment": {
            "title": "Technology Producer",
            "key_skill": "Confidence"
        },
        "address": {
            "city": "Erdmanhaven",
            "street_name": "Quitzon Mountain",
            "street_address": "25687 Schiller Courts",
            "zip_code": "77747-8823",
            "state": "Connecticut",
            "country": "United States"
        }
    }
]
```

## Listing users by state names:

Name query parameter is required.
Example:
```curl
curl localhost:6060/v1/users/states -d '{"name":"New Hampshire"}' -H "Content-Type: application/json"
```

Request body: 
```json
{
   "name":"New Hampshire"
}
```

Expected output:
```json
{
   "users":[
      {
         "uuid":6627,
         "first_name":"Will",
         "last_name":"Kessler",
         "email":"will.kessler@email.com",
         "gender":"Male",
         "employment":{
            "title":"Chief Consultant",
            "key_skill":"Proactive"
         },
         "address":{
            "city":"South Philomena",
            "street_name":"Rolfson Hill",
            "street_address":"810 Hayes Ferry",
            "zip_code":"05585-0113",
            "state":"New Hampshire",
            "country":"United States"
         }
      }
   ]
}
```

## Listing all key skills:

Name query parameter is required.
Example:
```curl
 curl localhost:6060/v1/users/skills
```

Expected output:
```json
[
    "Networking skills",
    "Teamwork",
    "Confidence",
    "Teamwork",
    "Organisation",
    "Organisation",
    "Organisation",
    "Problem solving",
    "Proactive",
    "Work under pressure"
]
```