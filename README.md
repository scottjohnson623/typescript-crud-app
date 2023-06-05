# Description of the project

This is a sample project using node.js and express.js to have a simple CRUD backend for modifying resources.

## Technologies Used

- express
- swagger
- pg
- zod
- typeORM
- bcryptjs / crypto
- eslint 
- prettier
- envalid

# Getting started

## Setup the Server

Then go inside the project and install the dependencies

```sh
cd typescript-crud-app
npm install
```

Next, rename the `.env.example` file to `.env`.

Then, generate a new public and private key to update `JWT_ACCESS_TOKEN_PRIVATE_KEY` and `JWT_ACCESS_TOKEN_PUBLIC_KEY` ( You can do so at https://cryptotools.net/rsagen)

\
If you have a postgres database instance already: 
--------
___
Update the .env variables to match the configuration of your postgres database

If you don't:
--------
___
Install docker (if you haven't) and start the postgres database with `docker compose up`, then run the necesssary database migrations with `npm run migrate`
___
\
\
Finally, start the server with `npm run dev`

You should see a message similar to 
```
Connected successfully on port 8000
```

If you now visit the server on localhost, (http://localhost:8000 with the port listed above), you should be greeted with a simple 
```
{
"message": "Hello World!"
}
```
## Test the API
Full API docs are created using swagger, and if your `NODE_ENV` environment variable is set to `development`, are available at the  `/api-docs` endpoint (http://localhost:8000/api-docs for the default port assignment)

1. First, you will want to create a user so that you can login to obtain an access token at `/auth/register`. If successful, you should get a response similar to  
```
{
    "status": "success",
    "data": {
        "user": {
            "name": "Scott Johnson",
            "email": "test@gmail.com",
            "id": "85f679b6-a62f-4144-831b-1335c7d8ac1c",
            "created_at": "2023-06-04T04:28:52.301Z",
            "updated_at": "2023-06-04T04:28:52.301Z"
        }
    }
}
``` 
2. Next, send a request to `/auth/login` using the newly registered user's email and password. You should get a response with a success message and an access token to consume the API with like
```
{
    "status": "success",
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NWY2NzliNi1hNjJmLTQxNDQtODMxYi0xMzM1YzdkOGFjMWMiLCJpYXQiOjE2ODU4ODU0MDMsImV4cCI6MTY4NTg4OTAwM30.YdgoaCkKNPMi5vCvw7vddwTJXhqHLfw4Txmuv25L2M9oGeid_VTu2Cspe0hUiHakPLHq167cmb9_VSgBEdSkqg"
}
```
3. You are now free to consume the API! Make sure any requests to protected API endpoints either send the cookie with the provided `access_token` or send the `access_token` as a bearer token `Authorization` header.