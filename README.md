# Storefront-backend-project
setup steps:

1- install postgres

2- install npm


### Server will run on port : 
3000


### database connections:

1- create a database in your machine

2- all the database tables used in this project will be created in your database using
migrations.
3- run migrate up, in order to add tables on your Postgres database.

### to see how to use the endpoints go to the REQUIREMENTS.md file :)

### NOTES:

In order to achieve security, all sensitive information will be stored in the .env file which is hidden,

But because this project is just for practice I will display some of these info here:

.env file:

POSTGRES_HOST = localhost

POSTGRES_USER = postgres

POSTGRES_PASSWORD = mark1999

POSTGRES_DB = store_front_database



POSTGRES_DB_TEST = store_front_database_test

ENV = dev


PASS_SALT = 10

PASS_PEPPER = 12345


JWT_KEY = 123


database.json file: // used for migrations

{

    "dev": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "store_front_database",
      "user": "postgres",
      "password": "mark1999"
    },
    "test": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "store_front_database_test",
      "user": "postgres",
      "password": "mark1999"
    }

