const mysql = require("mysql");
const inquirer = require("inquirer");

// console.log("hello!");

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'SomebodysOutThere42',
  database : 'bamazon'
});

connection.connect();
 
connection.query('SELECT item_id, product_name, price FROM products', function (error, results, fields) {
  if (error) throw error;
  // console.log('The solution is: ', results);
  for (var i = 0; i < results.length; i++) {
  	console.log("---------------------------------------------------------------");
  	console.log("Product Name: " + results[i].product_name);
  	console.log("Price: " + results[i].price);
  	console.log("Product ID: " + results[i].item_id);
  	console.log("================================================================");
  };
});
 
connection.end();