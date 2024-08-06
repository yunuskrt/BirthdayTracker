## Authentication Logic

- **AuthGuard**

  - Api routes are protected except '/api/v1/auth/register' and '/api/v1/auth/login'. Other requests should include a valid jwt token in authorization header. Otherwise, server throws UnauthorizedError. If jwt token verified successfully, 'user' field added to each request which is an Object that includes userId and mail, and can be reached through each request.
  - The guard module is registered globally instead of using useGuard() for each requests.
  - A custom decorator named @SkipAuth() is generated for the signup and login routes to avoid authorization header for these requests.

- **AuthService**

  - signIn method of authService compares the password with the encrypted password and returns the jwt token if operation is successful.
  - signUp method of authService registers a new user to users table checking the email uniqueness, email and password types.
  - authService uses userService to manipulate the users table in the database.

## Error Handling and Validation

- **Bad Requests**

  - Data types of request body and request querys are mostly checked with dtos, which uses 'class-validator' package. If request body is not in the desired format, server throws an error with a status code 400. Body and query is validated for each request.

- **Not Found Errors**

  - For the update, and delete operations of birthdays, if birthday is not updated or deleted, by the owner of the documents, i.e. requesting user is not owner of the birthday, server throws not found error. There is a ownerId check, which references to users table for the birthday requests, allows the personalization of documents.

- **Unauthorized Error**

  - As stated before, for each request a valid jwt token should be defined in authorization header. If token is not valid, user not exists or some other reason, server throws unauthorized error automatically.

## Utils

- **Conversions**

  - To send the birthdays in a ordered way according to how distant they are, a new model 'ResponseBirthday' is constructed that includes daysUntil additionally to 'Birthday' class.

- **Encryption**

  - As stated before, user passwords encrypted while storing in db, and decrypted while loging users in. The encryption & decryption functions defined here.

## API Endpoints

### Authentication Endpoints

- **Sign Up User**

  - `POST /api/v1/auth/register`
  - Request Body: `{ "email": "string", "password": "string"}`
  - Email is stored uniquely in database. If given email already exists in db, server throws the related error. Otherwise password is encrypyed, and stored in database.

- **Login User**

  - `POST /api/v1/auth/login`
  - Request Body: `{ "email": "string", "password": "string" }`
  - User found from the given email. If email not exists in db, server throws NotFoundError. Otherwise, user password in the database is decrypted, and compared with the password. If operation is successful, server returns a jwt access token, which stores the userId and user email as payload.

### Birthday Endpoints

-- For the following requests, requesting user is accessed through the middleware methodology in authGuard. And the birthdays documents where requesting user is the owner are operated dynamically. Therefore the ownerId is not sent through request body and request query.

- **Find All Birthdays**

  - `GET /api/v1/birthdays`
  - Retrieves the all birthday records whose owner is the requesting user.

- **Search Birthday by Name**

  - `GET /api/v1/birthdays?name=${searchedName}`
  - Searchs the birthday documents whose owner is the requesting where searchedName is a substring of the name field of birthday documents. The query may have at most 1 field and it must be named 'name'. If no query provided, it retrieves the all birthday records whose owner is the requesting user.

- **Find Upcoming Birthdays**

  - `GET /api/v1/birthdays/upcoming?period=${periodInt}`
  - The numeric value of period in query is validated with parseIntPipe of NestJs. period must be in range [1,90]. It retrieves all birthday records whose owner is requesting user, and the distant from now to the birthay is smaller than or equal to period.

- **Add Birthday**

  - `POST /api/v1/birthdays`
  - Request Body: `{ "name": "string", "date": "string", "category":"family" | "friends" }` or `{ "name": "string", "date": "string"}`
  - Creates a new birthday document in db whose ownerId is equal to requesting user id. Returns the created Birthday. If category is not given, it is registered as null in the database. Mongoose assigns automatically a unique id to Birthday, which will be used later on for update and delete operations.
  - There are 2 categories assigned for simplicity. However more category may be assigned under enums/category.ts

- **Update Birthday**

  - `PUT /api/v1/birthdays/:birthdayId`
  - Request Body: `{ "name": "string", "date": "string", "category": null | "family" | "friends" }
  - If document exists where requesting user id is the ownerId of birthday document, it updates the document with given name, date, and category values and returning back the updated Birthday. Otherwise, throws 404 Not Found error.

- **Delete Birthday**

  - `DELETE /api/v1/birthdays/:birthdayId`
  - If document exists where requesting user id is the ownerId of birthday document, it deletes it and returns a status code of 204 No Content. Otherwise, throws 404 Not Found error.

## Environment Variables

- **PORT**

  - Determines the running port of application.

- **MONGO_URI**

  - The connection string of MongoDB.

- **JWT_SECRET**

  - A randomly generated string used to generate and verify jwt tokens through jwtService.

- **ENCRYPTION_KEY**

  - Used for encryption & decryption of user passwords.

## Technologies

1. Database

   - MongoDB is used. Database is stored in MongoDb Atlas.

2. Backend

   - NestJS (TypeScript).

3. Frontend (Dashboard)
   - NextJS (Javascript).

## Client Decisions

    - Used react-bootstrap as well as custom css for styling.
    - Preferred NextJs, since it is a modular framework, and facilitates many operations such as routing.
    - Used axios package to make api calls.

## How to run?

### Client

1. Locate the client folder.

   - cd client

2. Installed the packages

   - npm install

3. Replace the api url with localhost

   - Replace https://birthdaytracker-production.up.railway.app with http://localhost:3000 for development.

4. Run the development server.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Server

1. Locate the server folder.

   - cd server

2. Set the environment variables

   - PORT
   - MONGO_URI
   - JWT_SECRET
   - ENCRYPTION_KEY

3. Install the packages

   - npm install

4. Run the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

1. Backend is deployed on railway.app.

   - https://birthdaytracker-production.up.railway.app

2. Front-end is deployed on Vercel.

   - https://birthday-tracker-sandy.vercel.app/

3. Dashboard can be tested from https://birthday-tracker-sandy.vercel.app/. It is connected to the deployed backend.
