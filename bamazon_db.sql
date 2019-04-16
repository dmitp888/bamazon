DROP DATABASE IF EXISTS bamazon_db ;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name  VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);
insert into products (product_name, department_name,price,stock_quantity)
values("ps4","electronics",400,100)
insert into products (product_name, department_name,price,stock_quantity)
values("nintendo","electronics",350,70)
insert into products (product_name, department_name,price,stock_quantity)
values("iphone X","electronics",999,50);
insert into products (product_name, department_name,price,stock_quantity)
values("Samsung phone","electronics",590,80);
insert into products (product_name, department_name,price,stock_quantity)
values("Sony tv","electronics", 2000, 20);

insert into products (product_name, department_name,price,stock_quantity)
values("pans","kitchen utensils",30,40);
insert into products (product_name, department_name,price,stock_quantity)
values("cups","kitchen utensils", 5, 200);
insert into products (product_name, department_name,price,stock_quantity)
values("wine glasses","kitchen utensils", 9, 57);
insert into products (product_name, department_name,price,stock_quantity)
values("silverware","kitchen utensils", 20, 59);

insert into products (product_name, department_name,price,stock_quantity)
values("cats","toys",34,40);
insert into products (product_name, department_name,price,stock_quantity)
values("dogs","toys", 55, 200);
insert into products (product_name, department_name,price,stock_quantity)
values("barby dolls","toys", 35, 57);
insert into products (product_name, department_name,price,stock_quantity)
values("alladin lamps","toys", 55, 67);
