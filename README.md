# OC P6 - Julien Lavocat

Repository url: https://github.com/JulienLavocat/OC_P6

## Tools and libraries used

| Tool                     | Used as                        |
| ------------------------ | ------------------------------ |
| Yarn                     | Package manager                |
| MongoDB                  | Database                       |
| Express                  | HTTP server                    |
| ESLint / Prettier        | Styling and linting            |
| Argon2                   | Passwords hashing algorithm    |
| Multer                   | Multipart/form-data middleware |
| Helmet / CORS            | Security middlewares           |
| jsonwebtokens            | JWT library                    |
| express-validation + JOI | Validation layer               |
| Docker + Docker compose  | Container managment            |

## Getting started

This project is using :

1. Clone the repository
2. Run `yarn install`
3. Run `docker compose up -d` in order to launch a MongoDB database (or have one running on port 27017)
4. Add rename `.env.example` to `.env` and set your values
5. Run `yarn start` to run the API (or `yarn start:dev` for development environment using nodemon)
