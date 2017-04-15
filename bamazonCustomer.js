//------------------------------------------------------------------------------------
// Requires

const mysql = require("mysql");
const inquirer = require("inquirer");

//====================================================================================


//------------------------------------------------------------------------------------
// Establishing the Connection Variables

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'SomebodysOutThere42',
  database : 'bamazon'
});

// Starting the connection 
connection.connect();

//====================================================================================


//-------------------------------------------------------------------------------------
// function to update the database based on the customers request

function buyItem(itemID, stock, quantity){
	var newStock = stock - quantity;
	connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ? AND stock_quantity = ?', [newStock, itemID, stock], function(error, results){
		if (error) throw error;
		console.log("Transaction Complete!");
		displayItems();
	});
};

//=====================================================================================


//--------------------------------------------------------------------------------------------
// Displays the items from the database

function displayItems() {
	connection.query('SELECT * FROM products', function (error, results, fields) {
	  
	  	if (error) throw error;
	  
		for (var i = 0; i < results.length; i++) {
	  		console.log("----------------------------------------------------------------");
	  		console.log("Product Name: " + results[i].product_name);
	  		console.log("Price: " + results[i].price);
	  		console.log("Product ID: " + results[i].item_id);
	  		console.log("================================================================");
		};

		customerStart(results);
	});
};

//=========================================================================================


//--------------------------------------------------------------------------------------
//  Displays the prompt for the customers order and passes in the results from displayItems() to avoid extra queries

function customerStart(results) {

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
		var stock = results[itemID-1].stock_quantity;
		var price = results[itemID-1].price;

		if (stock < quantity){
			console.log("Insufficient quantity!");
			displayItems();
		} else if (stock >= quantity) {
			console.log("Your total is $" + quantity * price);
			buyItem(itemID, stock, quantity);
		} else {
			console.log("There is some problem with the quantity check!");
		}

	});
};

//========================================================================================


// Starts the function chain
displayItems();
