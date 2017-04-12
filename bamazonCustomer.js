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
  	console.log("----------------------------------------------------------------");
  	console.log("Product Name: " + results[i].product_name);
  	console.log("Price: " + results[i].price);
  	console.log("Product ID: " + results[i].item_id);
  	console.log("================================================================");
  };
});

inquirer.prompt([

	{
		type: "input",
		message: "What is the ID of the item you would like to buy?",
		name: "ID"
	},	

	{
		type: "input",
		message: "How many would you like to buy?",
		name: "quantity"
	}

]).then(function(answers){

	console.log(answers);
	console.log(answers.ID);
	console.log(answers.quantity);

});
 
connection.end();