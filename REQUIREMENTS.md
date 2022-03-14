# API Requirements
## Instruction to access all the endpoints:
### 1- create a user accout (sign up):
using : users/create (post request)
request body = {"first_name":"anyName" , "last_name":"any","password":"anyPass"}
### 2- login with this user account
using url : users/login (post request)
request body = {"id":id , "password":"yourpassword"}

**note : the id is required to login so if you don't know your id you can get it manually from the database.**

**Now you are logged in and can access all the endpoint because you have a JWT token.**
## API Endpoints

### products
1- index : products/index (get request)

2- show : products/show/:id (get request)

3- create : products/create (post request) (body = {"name":"any","price":22}) [token required(log in)]



### users
**you must have a token or logged in to access these endpoints**

1- index : users/index (get request)

2- show : users/show/:id (get request)

3- create : users/create (post request) body = {"first_name":"anyName" , "last_name":"any","password":"anyPass"}

4- login : users/login (post request) body = {"id":id , "password":"yourpassword"}

5- logout : users/logout (get request) (This endpoint will clear the JWT token)

### orders
**you must have a token or logged in to access these endpoints**

1- index : orders/index (get request)

2- show : orders/show/:id (get request)

3- create : orders/create (post request) body = {"user_id":1,"product_id":1,"quantity":1,"status":0}

### services
1- to show orders for a specific user:

url : service/getorders/:user_id (get request)

2- to add product into an order

url : service/add     (post request)(post data will be in body) , body = {order_id:1 , product_id:1,quantity:2}

## Database Schema
![database schema](db_schema.png)


### products

id(integer) , name(character varying(100)) , price(character varying(100))


### users

id(integer) , first_name(character varying(100)) , last_name(character varying(100)) , password(character varying(255))


### orders

id(integer), user_id(integer) , status(integer)

### order_products

id(integer) , order_id(integer), product_id(integer), quantity(integer)

