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
 
connection.query('SELECT * FROM products', function (error, results, fields) {
  
  	if (error) throw error;
  
	for (var i = 0; i < results.length; i++) {
  		console.log("----------------------------------------------------------------");
  		console.log("Product Name: " + results[i].product_name);
  		console.log("Price: " + results[i].price);
  		console.log("Product ID: " + results[i].item_id);
  		console.log("================================================================");
	};


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

		var itemID = answers.ID;
		var quantity = answers.quantity;

		if (results[itemID-1].stock_quantity < quantity){
			console.log("Insufficient quantity!");
		} else if (results[itemID-1].stock_quantity >= quantity) {
			console.log("Right away sir!");
		} else {
			console.log("There is some problem with the quantity check!");
		}

	});
 

});
connection.end();