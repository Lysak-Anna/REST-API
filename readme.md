## Phonebook API

This is a simple API to save your contacts. You also can add, update and delete your contacts in real time.
Pagination available. By default: (GET /contacts?page=1&limit=20). Filter contacts by favorite fields: (GET /contacts?favorite=true or false).
This API includes user authorization.

### Commands:

- `npm start` &mdash; server start in production mode
- `npm run start:dev` &mdash; start the server in development mode
- `npm run lint` &mdash; run a code check run with eslint, must run before each PR and fix all linter errors
- `npm lint:fix` &mdash; the same linter check, but with automatic fixes for simple errors

### Routes:

| Methods | Routes                                 | Description                 |
| ------- | -------------------------------------- | --------------------------- |
| GET     | http://:3000/api/contacts/             | get all contacts            |
| GET     | http://:3000/api/contacts/:id          | get one contact by id       |
| POST    | http://:3000/api/contacts/             | add new contact             |
| PUT     | http://:3000/api/contacts/:id          | update contact by id        |
| PATCH   | http://:3000/api/contacts/:id/favorite | update favorite field by id |
| DELETE  | http://:3000/api/contacts/:id          | delete contact by id        |
| POST    | http://:3000/api/users/register        | register new user           |
| POST    | http://:3000/api/users/login           | login of an exixting user   |
| POST    | http://:3000/api/users/logout          | logout                      |
| GET     | http://:3000/api/users/current         | check current user          |
| PATCH   | http://:3000/api/users/                | subscription renewal        |
