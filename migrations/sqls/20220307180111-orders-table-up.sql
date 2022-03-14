/* Replace with your SQL commands */

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id integer,
    status integer
);

ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users(id);
