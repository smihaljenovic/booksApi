# Books API
Simple dockerized book collection api with frontend and backend.

## Setup docker instance
Run command `docker-compose up` inside `root` folder.
This will run complete docker instance of books api with backend, frontend and MySQL database.
On first run, database will be created with two users. Default root user and api specific book user.

### Docker migrations and seeders
To run database migrations and seeders, use special deployment routs.
This is **required** to be able to use application. 

`GET /api/v1/migrate` to run migrations

`GET /api/v1/migrateList` to check migrations

`GET /api/v1/seed` to run seeds

### Run tests
It is recommended to run tests on empty database. Tests can be run inside docker instance, inside booksApi folder.
Run command `node ace test unit`.
