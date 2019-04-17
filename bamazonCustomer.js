var inquirer = require("inquirer");
var mysql = require("mysql");
//creating connection with sql db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  readProducts();
});
function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    // Log all results of the SELECT statement
    console.log("-----------------------------------");
    console.log("id| product | department | price | quantity");
    console.log("-----------------------------------");

    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].id +
          " | " +
          res[i].product_name +
          " | " +
          res[i].department_name +
          " | " +
          res[i].price +
          " | " +
          res[i].stock_quantity
      );
    }
    console.log("-----------------------------------");
    order();
  });
}
function order() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the ID of the product you would like to buy?",
        name: "ID"
      },
      {
        type: "input",
        message: "How many units of the product you would like to buy?",
        name: "units"
      }
    ])
    .then(function(answer) {
      //console.log(answer.ID);
      connection.query(
        "SELECT stock_quantity,price FROM products WHERE ?",
        { ID: answer.ID },
        function(err, res) {
          if (res[0].stock_quantity > 0) {
            var purchase = answer.units * res[0].price;
            var newq = res[0].stock_quantity - answer.units;
            connection.query("UPDATE products  SET ?  WHERE ?", [
              {
                stock_quantity: newq
              },
              {
                id: answer.ID
              },
              console.log(
                "The total cost of your purchase is: " +
                  purchase +
                  "$." +
                  " Thank you for shopping with us!"
              ),
              connection.end,
              order()
            ]);
          } else {
            console.log(
              "Sorry but this item is currently out of stock! Please come back later!"
            );
            connection.end;
          }
        }
      );
    });
}
