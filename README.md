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