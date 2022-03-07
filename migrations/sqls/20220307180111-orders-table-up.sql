/* Replace with your SQL commands */

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    product_id integer,
    user_id integer,
    quantity integer,
    status integer
);

ALTER TABLE orders ADD FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users(id);
