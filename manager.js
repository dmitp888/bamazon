var inquirer = require("inquirer");
var mysql = require("mysql");

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
  menu();
});
function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
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
  });
}

function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "actions",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory"
        ]
      }
    ])
    .then(function(answer) {
      switch (answer.actions) {
        case "View Products for Sale":
          readProducts();
          break;

        case "View Low Inventory":
          lowinventory();

          break;

        case "Add to Inventory":
          addinventory();

          break;
      }
    });
}

function lowinventory() {
  connection.query(
    "SELECT id,product_name,department_name, stock_quantity FROM products Where stock_quantity< 5 ORDER BY products.stock_quantity ASC;",
    function(err, res) {
      console.log("id| product | department  | quanity");
      console.log("-----------------------------------");
      for (var i = 0; i < res.length; i++) {
        console.log(
          res[i].id +
            " | " +
            res[i].product_name +
            " | " +
            res[i].department_name +
            " | " +
            res[i].stock_quantity
        );
      }
      console.log("-----------------------------------");
    }
  );
}
var itemarr = [];
function addinventory() {
  connection.query("SELECT product_name,stock_quantity from products", function(
    err,
    res
  ) {
    for (var i = 0; i < res.length; i++) {
      let items = res[i].product_name;

      itemarr.push(items);
    }
    inquirer
      .prompt([
        {
          type: "list",
          name: "items",
          message: "What product would you like to add more to?",
          choices: itemarr
        },
        {
          type: "input",
          name: "itemsquantity",
          message: "How much would you like to add more?"
        }
      ])
      .then(function(answer) {
        connection.query(
          "SELECT stock_quantity FROM products WHERE ?",
          { product_name: answer.items },
          function(err, res) {
            var newq =
              parseInt(res[0].stock_quantity) + parseInt(answer.itemsquantity);

            connection.query("UPDATE products  SET ?  WHERE ?", [
              {
                stock_quantity: newq
              },
              {
                product_name: answer.items
              }
            ]);
            console.log(
              "Previous amount of selected product: " + res[0].stock_quantity
            );
            console.log(
              "New amount of selected product: " + answer.items + " " + newq
            );
            connection.end;
            menu();
          }
        );
      });
  });
}
