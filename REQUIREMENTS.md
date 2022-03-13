# API Requirements
## Instruction to access all the endpoints:
### 1- create an user accout (sign up):
using : users/create (post request)
request body = {"first_name":"anyName" , "last_name":"any","password":"anyPass"}
### 2- login with this user account
using url : users/login (post request)
request body = {"id":id , "password":"yourpassword"}
**note :** the id is required to login so if you don't know your id you can get it manually from the database
**Now you are logged in and can access all the endpoint because you have a JWT token.**
## API Endpoins

### products


### users

### orders