# Storefront-backend-project
### setup steps:

1- install postgres

2- install npm (run: npm install to install packages)

3- run : db-migrate up (to build the used tables on your local machine)


### Server will run on port : 
3000


### database connections:

1- create a database in your machine

2- all the database tables used in this project will be created in your database using
migrations.

3- run migrate up, in order to add tables on your Postgres database.

4- check "database.json" file and change in its values to be suitable with your local machine values for example : 

if you want to run this project using database called "shop" then change :

"database":"store_front_database" to "database" : "shop"



### NOTES:

In order to achieve security, all sensitive information will be stored in the .env file which is hidden,

But because this project is just for practice I will display some of these info here:
### you must change these values with your suitable values.
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

