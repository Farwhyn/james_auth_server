# James Auth Server
### _Authentication using JWT_

## API Schema

- Load contents of api.yml into an Online Swagger UI editor to see documentation
- When using Postman to make GET /api/v1/sessions and GET /api/v1/logout, be sure to include Bearer token (retrieved from POST /api/v1/login)

## Installation

Clone the repo and perform the following steps

```sh
cd jwt_auth_server
yarn
./scripts/start_mongodb_docker.sh -r
yarn dev
```

To run unit tests:

```sh
yarn test
```
