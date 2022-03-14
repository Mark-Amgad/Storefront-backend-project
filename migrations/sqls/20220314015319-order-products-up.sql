/* Replace with your SQL commands */

CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    order_id integer,
    product_id integer,
    quantity integer
);

ALTER TABLE order_products ADD FOREIGN KEY (order_id) REFERENCES orders(id);
ALTER TABLE order_products ADD FOREIGN KEY (product_id) REFERENCES products(id);